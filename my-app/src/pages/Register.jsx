import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import RouteLink from "../components/RouteLink";
import { grades, provinces, relationships } from "../data/registration";
import { links } from "../data/site";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const OTHER_SCHOOL = "__other__";

const emptyForm = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  phoneNumber: "",
  email: "",
  province: "",
  town: "",
  suburb: "",
  postalCode: "",
  schoolId: "",
  schoolName: "",
  currentGrade: "",
  kinFirstName: "",
  kinLastName: "",
  kinRelationship: "",
  kinPhoneNumber: "",
  kinEmail: "",
  kinSameAddress: true,
  kinProvince: "",
  kinTown: "",
  kinSuburb: "",
  kinPostalCode: "",
  canCollectStudent: false,
  canReceiveReports: true,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

function ageOn(dateString) {
  const birth = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDelta = today.getMonth() - birth.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birth.getDate())) age -= 1;
  return age;
}

function generateStudentNumber() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let index = 0; index < 6; index += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `ACE-${new Date().getFullYear()}-${suffix}`;
}

function validate(form) {
  const errors = {};

  if (!form.firstName.trim()) errors.firstName = "First name is required.";
  if (!form.lastName.trim()) errors.lastName = "Last name is required.";

  if (!form.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required.";
  } else {
    const age = ageOn(form.dateOfBirth);
    if (Number.isNaN(age)) errors.dateOfBirth = "Enter a valid date.";
    else if (age < 3) errors.dateOfBirth = "The learner must be at least 3 years old.";
    else if (age > 100) errors.dateOfBirth = "Check the date of birth.";
  }

  if (!form.phoneNumber.trim()) errors.phoneNumber = "A contact number is required.";
  else if (!isValidPhone(form.phoneNumber)) errors.phoneNumber = "Enter a valid contact number.";

  if (form.email.trim() && !emailPattern.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.province) errors.province = "Select a province.";
  if (!form.town.trim()) errors.town = "Town or city is required.";
  if (form.postalCode.trim() && !/^\d{4}$/.test(form.postalCode.trim())) {
    errors.postalCode = "Postal code should be 4 digits.";
  }

  if (!form.currentGrade) errors.currentGrade = "Select the current grade.";
  if (form.schoolId === OTHER_SCHOOL && !form.schoolName.trim()) {
    errors.schoolName = "Enter the school name.";
  }

  if (!form.kinFirstName.trim()) errors.kinFirstName = "Next of kin first name is required.";
  if (!form.kinLastName.trim()) errors.kinLastName = "Next of kin last name is required.";
  if (!form.kinRelationship) errors.kinRelationship = "Select the relationship.";
  if (!form.kinPhoneNumber.trim()) errors.kinPhoneNumber = "A next of kin contact number is required.";
  else if (!isValidPhone(form.kinPhoneNumber)) errors.kinPhoneNumber = "Enter a valid contact number.";

  if (form.kinEmail.trim() && !emailPattern.test(form.kinEmail.trim())) {
    errors.kinEmail = "Enter a valid email address.";
  }

  if (!form.kinSameAddress) {
    if (!form.kinProvince) errors.kinProvince = "Select a province.";
    if (!form.kinTown.trim()) errors.kinTown = "Town or city is required.";
    if (form.kinPostalCode.trim() && !/^\d{4}$/.test(form.kinPostalCode.trim())) {
      errors.kinPostalCode = "Postal code should be 4 digits.";
    }
  }

  return errors;
}

function trimmedOrNull(value) {
  const next = value.trim();
  return next === "" ? null : next;
}

export default function Register() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [schools, setSchools] = useState([]);
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!supabase) return undefined;

    let cancelled = false;
    supabase
      .from("schools")
      .select("school_id, school_name, town, province")
      .eq("active", true)
      .order("school_name", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled || error) return;
        setSchools(data ?? []);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const maxDateOfBirth = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const update = (field) => (event) => {
    const { type, checked, value } = event.target;
    setForm((current) => ({ ...current, [field]: type === "checkbox" ? checked : value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  async function resolveSchoolId() {
    if (!form.schoolId) return null;
    if (form.schoolId !== OTHER_SCHOOL) return form.schoolId;

    const schoolName = form.schoolName.trim();

    const { data: existing, error: lookupError } = await supabase
      .from("schools")
      .select("school_id")
      .ilike("school_name", schoolName)
      .limit(1);

    if (lookupError) throw lookupError;
    if (existing && existing.length > 0) return existing[0].school_id;

    const { data: created, error: insertError } = await supabase
      .from("schools")
      .insert({
        school_name: schoolName,
        province: form.province,
        town: form.town.trim(),
        suburb: trimmedOrNull(form.suburb),
        postal_code: trimmedOrNull(form.postalCode),
      })
      .select("school_id")
      .single();

    if (insertError) throw insertError;
    return created.school_id;
  }

  async function insertStudent(schoolId) {
    // student_number is unique, so retry a few times if a generated code collides.
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const studentNumber = generateStudentNumber();
      const { data, error } = await supabase
        .from("students")
        .insert({
          student_number: studentNumber,
          first_name: form.firstName.trim(),
          middle_name: trimmedOrNull(form.middleName),
          last_name: form.lastName.trim(),
          date_of_birth: form.dateOfBirth,
          phone_number: form.phoneNumber.trim(),
          email: trimmedOrNull(form.email),
          province: form.province,
          town: form.town.trim(),
          suburb: trimmedOrNull(form.suburb),
          postal_code: trimmedOrNull(form.postalCode),
          school_id: schoolId,
          current_grade: form.currentGrade,
          status: "active",
        })
        .select("student_id, student_number")
        .single();

      if (!error) return data;

      const collidedOnNumber = error.code === "23505" && String(error.message).includes("student_number");
      if (!collidedOnNumber) throw error;
    }

    throw new Error("Could not allocate a student number. Please try again.");
  }

  async function insertNextOfKin(studentId) {
    const useStudentAddress = form.kinSameAddress;

    const { error } = await supabase.from("next_of_kin").insert({
      student_id: studentId,
      first_name: form.kinFirstName.trim(),
      last_name: form.kinLastName.trim(),
      relationship: form.kinRelationship,
      phone_number: form.kinPhoneNumber.trim(),
      email: trimmedOrNull(form.kinEmail),
      province: useStudentAddress ? form.province : form.kinProvince,
      town: useStudentAddress ? form.town.trim() : form.kinTown.trim(),
      suburb: trimmedOrNull(useStudentAddress ? form.suburb : form.kinSuburb),
      postal_code: trimmedOrNull(useStudentAddress ? form.postalCode : form.kinPostalCode),
      is_primary: true,
      can_collect_student: form.canCollectStudent,
      can_receive_reports: form.canReceiveReports,
    });

    if (error) throw error;
  }

  function describeError(error) {
    if (error?.code === "23505" && String(error.message).includes("email")) {
      return "A student is already registered with that email address.";
    }
    if (String(error?.message).includes("Failed to fetch")) {
      return "Could not reach the server. Check your connection and try again.";
    }
    return error?.message || "Something went wrong. Please try again.";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitError("Please correct the highlighted fields.");
      return;
    }

    if (!supabase) {
      setSubmitError("Registration is not connected to the database yet. Please contact us directly.");
      return;
    }

    setStatus("submitting");
    setSubmitError("");

    let student = null;

    try {
      const schoolId = await resolveSchoolId();
      student = await insertStudent(schoolId);
      await insertNextOfKin(student.student_id);

      setResult(student);
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      if (student) {
        // The student row was created but next of kin failed. Roll it back so the
        // registration can be submitted again cleanly.
        await supabase.from("students").delete().eq("student_id", student.student_id);
      }
      setSubmitError(describeError(error));
      setStatus("idle");
    }
  }

  if (status === "success" && result) {
    return (
      <>
        <PageHeader
          eyebrow="Registration received"
          title="You are registered. Keep your student number safe."
          lead="Our team will confirm placement, class times and fees with you shortly."
        />

        <section className="section-block register-success">
          <div className="register-success-card">
            <span>Student number</span>
            <strong>{result.student_number}</strong>
            <p>Quote this number in every message, payment reference and class enquiry.</p>
          </div>

          <div className="register-next-steps">
            <h2>What happens next</h2>
            <ol>
              <li>A programme coordinator reviews your registration and matches you to a class.</li>
              <li>You receive class times, the tutor allocation and the fee schedule.</li>
              <li>Payment is confirmed and your seat is secured.</li>
            </ol>
            <div className="center-actions">
              <a className="btn btn-primary" href={links.whatsapp} target="_blank" rel="noreferrer">
                Message us on WhatsApp
              </a>
              <RouteLink to="/" className="btn btn-secondary">Back to Home</RouteLink>
            </div>
          </div>
        </section>
      </>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <>
      <PageHeader
        eyebrow="Student registration"
        title="Register once. We handle the placement from there."
        lead="Complete the form below to register as an Ace the Academia student. Fields marked with an asterisk are required."
      />

      {!isSupabaseConfigured && (
        <section className="section-block">
          <p className="form-banner is-warning">
            Registration is not connected to the database yet. Add your Supabase keys to <code>my-app/.env</code> to enable submissions.
          </p>
        </section>
      )}

      <section className="section-block">
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <fieldset disabled={isSubmitting}>
            <legend>
              <span className="eyebrow">Step 01</span>
              <h2>Student details</h2>
            </legend>

            <div className="field-grid">
              <label>
                <span>First name *</span>
                <input type="text" value={form.firstName} onChange={update("firstName")} autoComplete="given-name" />
                {errors.firstName && <em className="field-error">{errors.firstName}</em>}
              </label>

              <label>
                <span>Middle name</span>
                <input type="text" value={form.middleName} onChange={update("middleName")} autoComplete="additional-name" />
              </label>

              <label>
                <span>Last name *</span>
                <input type="text" value={form.lastName} onChange={update("lastName")} autoComplete="family-name" />
                {errors.lastName && <em className="field-error">{errors.lastName}</em>}
              </label>

              <label>
                <span>Date of birth *</span>
                <input type="date" max={maxDateOfBirth} value={form.dateOfBirth} onChange={update("dateOfBirth")} />
                {errors.dateOfBirth && <em className="field-error">{errors.dateOfBirth}</em>}
              </label>

              <label>
                <span>Contact number *</span>
                <input type="tel" value={form.phoneNumber} onChange={update("phoneNumber")} placeholder="073 929 8456" autoComplete="tel" />
                {errors.phoneNumber && <em className="field-error">{errors.phoneNumber}</em>}
              </label>

              <label>
                <span>Email address</span>
                <input type="email" value={form.email} onChange={update("email")} autoComplete="email" />
                {errors.email && <em className="field-error">{errors.email}</em>}
              </label>
            </div>
          </fieldset>

          <fieldset disabled={isSubmitting}>
            <legend>
              <span className="eyebrow">Step 02</span>
              <h2>Where the student lives</h2>
            </legend>

            <div className="field-grid">
              <label>
                <span>Province *</span>
                <select value={form.province} onChange={update("province")}>
                  <option value="">Select a province</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
                {errors.province && <em className="field-error">{errors.province}</em>}
              </label>

              <label>
                <span>Town or city *</span>
                <input type="text" value={form.town} onChange={update("town")} autoComplete="address-level2" />
                {errors.town && <em className="field-error">{errors.town}</em>}
              </label>

              <label>
                <span>Suburb</span>
                <input type="text" value={form.suburb} onChange={update("suburb")} />
              </label>

              <label>
                <span>Postal code</span>
                <input type="text" inputMode="numeric" maxLength={4} value={form.postalCode} onChange={update("postalCode")} autoComplete="postal-code" />
                {errors.postalCode && <em className="field-error">{errors.postalCode}</em>}
              </label>
            </div>
          </fieldset>

          <fieldset disabled={isSubmitting}>
            <legend>
              <span className="eyebrow">Step 03</span>
              <h2>School and grade</h2>
            </legend>

            <div className="field-grid">
              <label>
                <span>School</span>
                <select value={form.schoolId} onChange={update("schoolId")}>
                  <option value="">Select a school</option>
                  {schools.map((school) => (
                    <option key={school.school_id} value={school.school_id}>
                      {school.town ? `${school.school_name} - ${school.town}` : school.school_name}
                    </option>
                  ))}
                  <option value={OTHER_SCHOOL}>My school is not listed</option>
                </select>
              </label>

              {form.schoolId === OTHER_SCHOOL && (
                <label>
                  <span>School name *</span>
                  <input type="text" value={form.schoolName} onChange={update("schoolName")} />
                  {errors.schoolName && <em className="field-error">{errors.schoolName}</em>}
                </label>
              )}

              <label>
                <span>Current grade *</span>
                <select value={form.currentGrade} onChange={update("currentGrade")}>
                  <option value="">Select a grade</option>
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
                {errors.currentGrade && <em className="field-error">{errors.currentGrade}</em>}
              </label>
            </div>
          </fieldset>

          <fieldset disabled={isSubmitting}>
            <legend>
              <span className="eyebrow">Step 04</span>
              <h2>Parent, guardian or next of kin</h2>
            </legend>

            <div className="field-grid">
              <label>
                <span>First name *</span>
                <input type="text" value={form.kinFirstName} onChange={update("kinFirstName")} />
                {errors.kinFirstName && <em className="field-error">{errors.kinFirstName}</em>}
              </label>

              <label>
                <span>Last name *</span>
                <input type="text" value={form.kinLastName} onChange={update("kinLastName")} />
                {errors.kinLastName && <em className="field-error">{errors.kinLastName}</em>}
              </label>

              <label>
                <span>Relationship to student *</span>
                <select value={form.kinRelationship} onChange={update("kinRelationship")}>
                  <option value="">Select a relationship</option>
                  {relationships.map((relationship) => (
                    <option key={relationship.value} value={relationship.value}>{relationship.label}</option>
                  ))}
                </select>
                {errors.kinRelationship && <em className="field-error">{errors.kinRelationship}</em>}
              </label>

              <label>
                <span>Contact number *</span>
                <input type="tel" value={form.kinPhoneNumber} onChange={update("kinPhoneNumber")} />
                {errors.kinPhoneNumber && <em className="field-error">{errors.kinPhoneNumber}</em>}
              </label>

              <label>
                <span>Email address</span>
                <input type="email" value={form.kinEmail} onChange={update("kinEmail")} />
                {errors.kinEmail && <em className="field-error">{errors.kinEmail}</em>}
              </label>
            </div>

            <div className="checkbox-stack">
              <label className="checkbox-row">
                <input type="checkbox" checked={form.kinSameAddress} onChange={update("kinSameAddress")} />
                <span>Lives at the same address as the student</span>
              </label>
              <label className="checkbox-row">
                <input type="checkbox" checked={form.canCollectStudent} onChange={update("canCollectStudent")} />
                <span>May collect the student from class</span>
              </label>
              <label className="checkbox-row">
                <input type="checkbox" checked={form.canReceiveReports} onChange={update("canReceiveReports")} />
                <span>May receive progress reports and results</span>
              </label>
            </div>

            {!form.kinSameAddress && (
              <div className="field-grid">
                <label>
                  <span>Province *</span>
                  <select value={form.kinProvince} onChange={update("kinProvince")}>
                    <option value="">Select a province</option>
                    {provinces.map((province) => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                  {errors.kinProvince && <em className="field-error">{errors.kinProvince}</em>}
                </label>

                <label>
                  <span>Town or city *</span>
                  <input type="text" value={form.kinTown} onChange={update("kinTown")} />
                  {errors.kinTown && <em className="field-error">{errors.kinTown}</em>}
                </label>

                <label>
                  <span>Suburb</span>
                  <input type="text" value={form.kinSuburb} onChange={update("kinSuburb")} />
                </label>

                <label>
                  <span>Postal code</span>
                  <input type="text" inputMode="numeric" maxLength={4} value={form.kinPostalCode} onChange={update("kinPostalCode")} />
                  {errors.kinPostalCode && <em className="field-error">{errors.kinPostalCode}</em>}
                </label>
              </div>
            )}
          </fieldset>

          {submitError && <p className="form-banner is-error">{submitError}</p>}

          <div className="register-actions">
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting registration..." : "Submit Registration"}
            </button>
            <p className="register-note">
              By registering you agree to our <RouteLink to="/privacy-policy">Privacy Policy</RouteLink> and <RouteLink to="/terms-of-service">Terms of Service</RouteLink>.
            </p>
          </div>
        </form>
      </section>
    </>
  );
}
