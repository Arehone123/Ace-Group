-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.users (
  user_id uuid NOT NULL DEFAULT gen_random_uuid(),
  username character varying NOT NULL UNIQUE,
  email character varying NOT NULL UNIQUE,
  password_hash text NOT NULL,
  role USER-DEFINED NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (user_id)
);
CREATE TABLE public.schools (
  school_id uuid NOT NULL DEFAULT gen_random_uuid(),
  school_code character varying UNIQUE,
  school_name character varying NOT NULL,
  province character varying NOT NULL,
  town character varying NOT NULL,
  suburb character varying,
  postal_code character varying,
  school_type character varying,
  active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT schools_pkey PRIMARY KEY (school_id)
);
CREATE TABLE public.subjects (
  subject_id uuid NOT NULL DEFAULT gen_random_uuid(),
  subject_code character varying UNIQUE,
  subject_name character varying NOT NULL UNIQUE,
  description text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT subjects_pkey PRIMARY KEY (subject_id)
);
CREATE TABLE public.students (
  student_id uuid NOT NULL DEFAULT gen_random_uuid(),
  student_number character varying UNIQUE,
  first_name character varying NOT NULL,
  middle_name character varying,
  last_name character varying NOT NULL,
  date_of_birth date,
  phone_number character varying,
  email character varying,
  province character varying,
  town character varying,
  suburb character varying,
  postal_code character varying,
  school_id uuid,
  current_grade character varying,
  status USER-DEFINED NOT NULL DEFAULT 'active'::student_status,
  user_id uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT students_pkey PRIMARY KEY (student_id),
  CONSTRAINT students_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.schools(school_id),
  CONSTRAINT students_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);
CREATE TABLE public.next_of_kin (
  next_of_kin_id uuid NOT NULL DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  first_name character varying NOT NULL,
  last_name character varying NOT NULL,
  relationship USER-DEFINED NOT NULL,
  phone_number character varying,
  email character varying,
  province character varying,
  town character varying,
  suburb character varying,
  postal_code character varying,
  is_primary boolean NOT NULL DEFAULT false,
  can_collect_student boolean NOT NULL DEFAULT false,
  can_receive_reports boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT next_of_kin_pkey PRIMARY KEY (next_of_kin_id),
  CONSTRAINT next_of_kin_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id)
);
CREATE TABLE public.tutors (
  tutor_id uuid NOT NULL DEFAULT gen_random_uuid(),
  employee_number character varying UNIQUE,
  first_name character varying NOT NULL,
  middle_name character varying,
  last_name character varying NOT NULL,
  phone_number character varying,
  email character varying,
  province character varying,
  town character varying,
  suburb character varying,
  postal_code character varying,
  years_experience integer CHECK (years_experience >= 0),
  user_id uuid,
  active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT tutors_pkey PRIMARY KEY (tutor_id),
  CONSTRAINT tutors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);
CREATE TABLE public.tutor_subjects (
  tutor_subject_id uuid NOT NULL DEFAULT gen_random_uuid(),
  tutor_id uuid NOT NULL,
  subject_id uuid NOT NULL,
  proficiency_level character varying,
  years_experience integer CHECK (years_experience >= 0),
  active boolean NOT NULL DEFAULT true,
  CONSTRAINT tutor_subjects_pkey PRIMARY KEY (tutor_subject_id),
  CONSTRAINT tutor_subjects_tutor_id_fkey FOREIGN KEY (tutor_id) REFERENCES public.tutors(tutor_id),
  CONSTRAINT tutor_subjects_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(subject_id)
);
CREATE TABLE public.tutoring_classes (
  class_id uuid NOT NULL DEFAULT gen_random_uuid(),
  tutor_id uuid NOT NULL,
  subject_id uuid NOT NULL,
  grade_level character varying NOT NULL,
  class_model USER-DEFINED NOT NULL,
  class_type USER-DEFINED NOT NULL,
  capacity integer NOT NULL DEFAULT 1 CHECK (capacity > 0),
  fee numeric NOT NULL CHECK (fee > 0::numeric),
  active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT tutoring_classes_pkey PRIMARY KEY (class_id),
  CONSTRAINT tutoring_classes_tutor_id_fkey FOREIGN KEY (tutor_id) REFERENCES public.tutors(tutor_id),
  CONSTRAINT tutoring_classes_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(subject_id)
);
CREATE TABLE public.class_schedules (
  schedule_id uuid NOT NULL DEFAULT gen_random_uuid(),
  class_id uuid NOT NULL,
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time time without time zone NOT NULL,
  end_time time without time zone NOT NULL,
  start_date date NOT NULL,
  end_date date,
  active boolean NOT NULL DEFAULT true,
  CONSTRAINT class_schedules_pkey PRIMARY KEY (schedule_id),
  CONSTRAINT class_schedules_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.tutoring_classes(class_id)
);
CREATE TABLE public.enrolments (
  enrolment_id uuid NOT NULL DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  class_id uuid NOT NULL,
  start_date date NOT NULL,
  end_date date,
  status USER-DEFINED NOT NULL DEFAULT 'active'::enrolment_status,
  agreed_fee numeric CHECK (agreed_fee IS NULL OR agreed_fee > 0::numeric),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT enrolments_pkey PRIMARY KEY (enrolment_id),
  CONSTRAINT enrolments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id),
  CONSTRAINT enrolments_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.tutoring_classes(class_id)
);
CREATE TABLE public.tutoring_sessions (
  session_id uuid NOT NULL DEFAULT gen_random_uuid(),
  class_id uuid NOT NULL,
  session_date date NOT NULL,
  start_time time without time zone NOT NULL,
  end_time time without time zone NOT NULL,
  topic character varying,
  status character varying NOT NULL DEFAULT 'scheduled'::character varying,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT tutoring_sessions_pkey PRIMARY KEY (session_id),
  CONSTRAINT tutoring_sessions_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.tutoring_classes(class_id)
);
CREATE TABLE public.attendance (
  attendance_id uuid NOT NULL DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  student_id uuid NOT NULL,
  status USER-DEFINED NOT NULL,
  minutes_late integer NOT NULL DEFAULT 0 CHECK (minutes_late >= 0),
  notes text,
  recorded_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT attendance_pkey PRIMARY KEY (attendance_id),
  CONSTRAINT attendance_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.tutoring_sessions(session_id),
  CONSTRAINT attendance_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id)
);
CREATE TABLE public.assessments (
  assessment_id uuid NOT NULL DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL,
  school_id uuid,
  assessment_name character varying NOT NULL,
  assessment_type USER-DEFINED NOT NULL,
  grade_level character varying NOT NULL,
  max_score numeric NOT NULL CHECK (max_score > 0::numeric),
  assessment_date date NOT NULL,
  academic_year integer NOT NULL,
  term integer CHECK (term >= 1 AND term <= 4),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT assessments_pkey PRIMARY KEY (assessment_id),
  CONSTRAINT assessments_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(subject_id),
  CONSTRAINT assessments_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.schools(school_id)
);
CREATE TABLE public.assessment_results (
  result_id uuid NOT NULL DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL,
  student_id uuid NOT NULL,
  score numeric NOT NULL CHECK (score >= 0::numeric),
  percentage numeric CHECK (percentage >= 0::numeric AND percentage <= 100::numeric),
  feedback text,
  recorded_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT assessment_results_pkey PRIMARY KEY (result_id),
  CONSTRAINT assessment_results_assessment_id_fkey FOREIGN KEY (assessment_id) REFERENCES public.assessments(assessment_id),
  CONSTRAINT assessment_results_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id)
);
CREATE TABLE public.invoices (
  invoice_id uuid NOT NULL DEFAULT gen_random_uuid(),
  invoice_number character varying NOT NULL UNIQUE,
  student_id uuid NOT NULL,
  enrolment_id uuid,
  issue_date date NOT NULL,
  due_date date NOT NULL,
  subtotal numeric NOT NULL CHECK (subtotal >= 0::numeric),
  discount numeric NOT NULL DEFAULT 0 CHECK (discount >= 0::numeric),
  tax numeric NOT NULL DEFAULT 0 CHECK (tax >= 0::numeric),
  total numeric NOT NULL CHECK (total >= 0::numeric),
  status USER-DEFINED NOT NULL DEFAULT 'draft'::invoice_status,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT invoices_pkey PRIMARY KEY (invoice_id),
  CONSTRAINT invoices_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id),
  CONSTRAINT invoices_enrolment_id_fkey FOREIGN KEY (enrolment_id) REFERENCES public.enrolments(enrolment_id)
);
CREATE TABLE public.invoice_items (
  invoice_item_id uuid NOT NULL DEFAULT gen_random_uuid(),
  invoice_id uuid NOT NULL,
  description character varying NOT NULL,
  quantity numeric NOT NULL DEFAULT 1 CHECK (quantity > 0::numeric),
  unit_price numeric NOT NULL CHECK (unit_price > 0::numeric),
  amount numeric NOT NULL CHECK (amount >= 0::numeric),
  CONSTRAINT invoice_items_pkey PRIMARY KEY (invoice_item_id),
  CONSTRAINT invoice_items_invoice_id_fkey FOREIGN KEY (invoice_id) REFERENCES public.invoices(invoice_id)
);
CREATE TABLE public.payments (
  payment_id uuid NOT NULL DEFAULT gen_random_uuid(),
  invoice_id uuid,
  enrolment_id uuid,
  amount numeric NOT NULL CHECK (amount > 0::numeric),
  payment_date timestamp with time zone NOT NULL DEFAULT now(),
  payment_method USER-DEFINED NOT NULL,
  payment_status USER-DEFINED NOT NULL DEFAULT 'pending'::payment_status,
  reference character varying,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT payments_pkey PRIMARY KEY (payment_id),
  CONSTRAINT payments_invoice_id_fkey FOREIGN KEY (invoice_id) REFERENCES public.invoices(invoice_id),
  CONSTRAINT payments_enrolment_id_fkey FOREIGN KEY (enrolment_id) REFERENCES public.enrolments(enrolment_id)
);
CREATE TABLE public.audit_logs (
  audit_id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  entity_type character varying NOT NULL,
  entity_id uuid NOT NULL,
  action character varying NOT NULL,
  timestamp timestamp with time zone NOT NULL DEFAULT now(),
  old_value jsonb,
  new_value jsonb,
  CONSTRAINT audit_logs_pkey PRIMARY KEY (audit_id),
  CONSTRAINT audit_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);