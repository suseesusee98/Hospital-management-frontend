import { doctors } from '../data/doctors.js';

/**
 * Doctors aren't in the spec's Google Sheet (only Appointments is), so this
 * service serves the curated local dataset. It's written as async so it's
 * a drop-in swap later if doctors ever move to a sheet/API of their own.
 */
export async function getAllDoctors() {
  return Promise.resolve(doctors);
}

export async function getDoctorsByDepartment(department) {
  return Promise.resolve(doctors.filter((d) => d.department === department));
}

export async function getDoctorById(id) {
  return Promise.resolve(doctors.find((d) => d.id === id));
}
