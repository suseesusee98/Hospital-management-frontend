import api from './axios.js';

/**
 * Maps the AppointmentForm's camelCase state into the payload
 * shape the backend (Code.gs) expects.
 */
function buildPayload(form) {
  return {
    patientName: form.patientName,
    age: form.age,
    gender: form.gender,
    dob: form.dob,
    phone: form.phone,
    email: form.email,
    address: form.address,
    department: form.department,
    doctor: form.doctor,
    appointmentDate: form.appointmentDate,
    preferredTime: form.preferredTime,
    symptoms: form.symptoms,
    medicalHistory: form.medicalHistory,
    currentMedications: form.currentMedications,
    allergies: form.allergies,
    insuranceProvider: form.insuranceProvider,
    emergencyContact: form.emergencyContact,
    relationship: form.relationship
  };
}

export async function createAppointment(form) {
  const { data } = await api.post('', {
    action: 'create',
    data: buildPayload(form)
  });
  return data;
}

export async function getAllAppointments() {
  const { data } = await api.get('', { params: { action: 'list' } });
  return data;
}

export async function getAppointmentById(id) {
  const { data } = await api.get('', { params: { action: 'getById', id } });
  return data;
}

export async function updateAppointmentStatus(id, status) {
  const { data } = await api.post('', { action: 'updateStatus', id, status });
  return data;
}

export async function deleteAppointment(id) {
  const { data } = await api.post('', { action: 'delete', id });
  return data;
}
