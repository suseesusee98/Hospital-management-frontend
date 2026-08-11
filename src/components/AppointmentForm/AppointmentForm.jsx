import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { doctors } from '../../data/doctors.js';
import { departments } from '../../data/content.js';
import { createAppointment } from '../../services/appointmentService.js';
import { useToast } from '../Toast/ToastContext.jsx';
import Button from '../Button/Button.jsx';
import Loader from '../Loader/Loader.jsx';
import './AppointmentForm.css';

const EMPTY_FORM = {
  patientName: '',
  age: '',
  gender: '',
  dob: '',
  phone: '',
  email: '',
  address: '',
  department: '',
  doctor: '',
  appointmentDate: '',
  preferredTime: '',
  symptoms: '',
  medicalHistory: '',
  currentMedications: '',
  allergies: '',
  insuranceProvider: '',
  emergencyContact: '',
  emergencyName: '',
  relationship: '',
  consent: false
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{7,15}$/;

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

function validate(form) {
  const errors = {};

  if (!form.patientName.trim()) errors.patientName = 'Patient name is required.';
  if (!form.age) errors.age = 'Age is required.';
  else if (form.age < 0 || form.age > 120) errors.age = 'Enter a valid age.';
  if (!form.gender) errors.gender = 'Please select a gender.';
  if (!form.dob) errors.dob = 'Date of birth is required.';

  if (!form.phone.trim()) errors.phone = 'Phone number is required.';
  else if (!PHONE_RE.test(form.phone)) errors.phone = 'Enter a valid phone number.';

  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!EMAIL_RE.test(form.email)) errors.email = 'Enter a valid email address.';

  if (!form.address.trim()) errors.address = 'Address is required.';
  if (!form.department) errors.department = 'Please select a department.';
  if (!form.doctor) errors.doctor = 'Please select a doctor.';

  if (!form.appointmentDate) errors.appointmentDate = 'Appointment date is required.';
  else if (form.appointmentDate < todayISO()) errors.appointmentDate = 'Date cannot be in the past.';

  if (!form.preferredTime) errors.preferredTime = 'Please select a preferred time.';
  if (!form.symptoms.trim()) errors.symptoms = 'Please describe the reason for your visit.';

  if (!form.emergencyName.trim()) errors.emergencyName = 'Emergency contact name is required.';
  if (!form.emergencyContact.trim()) errors.emergencyContact = 'Emergency contact number is required.';
  else if (!PHONE_RE.test(form.emergencyContact)) errors.emergencyContact = 'Enter a valid phone number.';
  if (!form.relationship.trim()) errors.relationship = 'Relationship is required.';

  if (!form.consent) errors.consent = 'You must provide consent to book an appointment.';

  return errors;
}

export default function AppointmentForm() {
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    ...EMPTY_FORM,
    doctor: searchParams.get('doctor') || ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmedId, setConfirmedId] = useState(null);

  const availableDoctors = form.department
    ? doctors.filter((d) => d.department === form.department)
    : doctors;

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      showToast('Please fix the highlighted fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const result = await createAppointment({
        ...form,
        emergencyContact: `${form.emergencyName} — ${form.emergencyContact}`
      });

      if (result.success) {
        setConfirmedId(result.appointmentId);
        showToast('Appointment booked successfully!', 'success');
        setForm(EMPTY_FORM);
        setErrors({});
      } else {
        showToast(result.message || 'Something went wrong. Please try again.', 'error');
      }
    } catch (err) {
      showToast('Could not reach the server. Please try again shortly.', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmedId) {
    return (
      <div className="appt-confirm">
        <h3>You're booked.</h3>
        <p>Your appointment reference is</p>
        <span className="appt-confirm__id">{confirmedId}</span>
        <p>We've logged your details — our care team will confirm the exact time by phone or email.</p>
        <Button onClick={() => setConfirmedId(null)} variant="ghost">Book another appointment</Button>
      </div>
    );
  }

  return (
    <form className="appt-form" onSubmit={handleSubmit} noValidate>
      <fieldset className="appt-form__group">
        <legend>Patient details</legend>

        <Field label="Patient Name" error={errors.patientName}>
          <input value={form.patientName} onChange={(e) => update('patientName', e.target.value)} />
        </Field>

        <div className="appt-form__row">
          <Field label="Age" error={errors.age}>
            <input type="number" min="0" max="120" value={form.age} onChange={(e) => update('age', e.target.value)} />
          </Field>
          <Field label="Gender" error={errors.gender}>
            <select value={form.gender} onChange={(e) => update('gender', e.target.value)}>
              <option value="">Select</option>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </select>
          </Field>
          <Field label="Date of Birth" error={errors.dob}>
            <input type="date" max={todayISO()} value={form.dob} onChange={(e) => update('dob', e.target.value)} />
          </Field>
        </div>

        <div className="appt-form__row">
          <Field label="Phone Number" error={errors.phone}>
            <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 98765 43210" />
          </Field>
          <Field label="Email" error={errors.email}>
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" />
          </Field>
        </div>

        <Field label="Address" error={errors.address}>
          <textarea rows={2} value={form.address} onChange={(e) => update('address', e.target.value)} />
        </Field>
      </fieldset>

      <fieldset className="appt-form__group">
        <legend>Visit details</legend>

        <div className="appt-form__row">
          <Field label="Department" error={errors.department}>
            <select
              value={form.department}
              onChange={(e) => { update('department', e.target.value); update('doctor', ''); }}
            >
              <option value="">Select department</option>
              {departments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
          </Field>
          <Field label="Doctor" error={errors.doctor}>
            <select value={form.doctor} onChange={(e) => update('doctor', e.target.value)}>
              <option value="">Select doctor</option>
              {availableDoctors.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
          </Field>
        </div>

        <div className="appt-form__row">
          <Field label="Appointment Date" error={errors.appointmentDate}>
            <input type="date" min={todayISO()} value={form.appointmentDate} onChange={(e) => update('appointmentDate', e.target.value)} />
          </Field>
          <Field label="Preferred Time" error={errors.preferredTime}>
            <select value={form.preferredTime} onChange={(e) => update('preferredTime', e.target.value)}>
              <option value="">Select time</option>
              <option>9:00 AM</option>
              <option>10:30 AM</option>
              <option>12:00 PM</option>
              <option>2:00 PM</option>
              <option>3:30 PM</option>
              <option>5:00 PM</option>
            </select>
          </Field>
        </div>

        <Field label="Reason for Visit" error={errors.symptoms}>
          <textarea rows={2} value={form.symptoms} onChange={(e) => update('symptoms', e.target.value)} placeholder="Briefly describe your symptoms or reason for the visit" />
        </Field>
      </fieldset>

      <fieldset className="appt-form__group">
        <legend>Medical background <span>(optional)</span></legend>

        <Field label="Medical History">
          <textarea rows={2} value={form.medicalHistory} onChange={(e) => update('medicalHistory', e.target.value)} />
        </Field>
        <div className="appt-form__row">
          <Field label="Current Medications">
            <input value={form.currentMedications} onChange={(e) => update('currentMedications', e.target.value)} />
          </Field>
          <Field label="Allergies">
            <input value={form.allergies} onChange={(e) => update('allergies', e.target.value)} />
          </Field>
        </div>
        <Field label="Insurance Provider">
          <input value={form.insuranceProvider} onChange={(e) => update('insuranceProvider', e.target.value)} />
        </Field>
      </fieldset>

      <fieldset className="appt-form__group">
        <legend>Emergency contact</legend>

        <div className="appt-form__row">
          <Field label="Emergency Contact Name" error={errors.emergencyName}>
            <input value={form.emergencyName} onChange={(e) => update('emergencyName', e.target.value)} />
          </Field>
          <Field label="Emergency Contact Number" error={errors.emergencyContact}>
            <input type="tel" value={form.emergencyContact} onChange={(e) => update('emergencyContact', e.target.value)} />
          </Field>
          <Field label="Relationship" error={errors.relationship}>
            <input value={form.relationship} onChange={(e) => update('relationship', e.target.value)} placeholder="e.g. Spouse" />
          </Field>
        </div>
      </fieldset>

      <label className={`appt-form__consent ${errors.consent ? 'has-error' : ''}`}>
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update('consent', e.target.checked)}
        />
        <span>
          I confirm the information above is accurate and I consent to Pulse &amp; Wren
          Hospital using it to schedule and prepare for my visit.
        </span>
      </label>
      {errors.consent && <span className="appt-form__error">{errors.consent}</span>}

      <Button type="submit" size="lg" disabled={submitting} className="appt-form__submit">
        {submitting ? <Loader label="Booking" /> : 'Book Appointment'}
      </Button>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className={`appt-field ${error ? 'has-error' : ''}`}>
      <span className="appt-field__label">{label}</span>
      {children}
      {error && <span className="appt-field__error">{error}</span>}
    </label>
  );
}
