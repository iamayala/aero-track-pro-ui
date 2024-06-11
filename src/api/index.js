import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Adjust the base URL as needed

const api = {
  auth: {
    login: (payload) => axios.post(`${API_BASE_URL}/auth/login`, payload),
    updatePassword: (payload) => axios.put(`${API_BASE_URL}/auth/update-password`, payload)
  },

  user: {
    post: (payload) => axios.post(`${API_BASE_URL}/user`, payload),
    get: () => axios.get(`${API_BASE_URL}/user/`),
    getOne: (id) => axios.get(`${API_BASE_URL}/user/${id}`),
    put: (payload, id) => axios.put(`${API_BASE_URL}/user/${id}`, payload),
    delete: (id) => axios.delete(`${API_BASE_URL}/user/${id}`)
  },

  aircraft: {
    post: (payload) => axios.post(`${API_BASE_URL}/aircraft`, payload),
    get: () => axios.get(`${API_BASE_URL}/aircraft/`),
    getOne: (id) => axios.get(`${API_BASE_URL}/aircraft/${id}`),
    put: (payload, id) => axios.put(`${API_BASE_URL}/aircraft/${id}`, payload),
    delete: (id) => axios.delete(`${API_BASE_URL}/aircraft/${id}`)
  },

  document: {
    post: (payload) => axios.post(`${API_BASE_URL}/document`, payload),
    get: () => axios.get(`${API_BASE_URL}/document/`),
    getOne: (id) => axios.get(`${API_BASE_URL}/document/${id}`),
    put: (payload, id) => axios.put(`${API_BASE_URL}/document/${id}`, payload),
    delete: (id) => axios.delete(`${API_BASE_URL}/document/${id}`)
  },

  flight: {
    post: (payload) => axios.post(`${API_BASE_URL}/flight`, payload),
    get: () => axios.get(`${API_BASE_URL}/flight/`),
    getOne: (id) => axios.get(`${API_BASE_URL}/flight/${id}`),
    put: (payload, id) => axios.put(`${API_BASE_URL}/flight/${id}`, payload),
    delete: (id) => axios.delete(`${API_BASE_URL}/flight/${id}`)
  },

  maintenance: {
    post: (payload) => axios.post(`${API_BASE_URL}/maintenance`, payload),
    get: () => axios.get(`${API_BASE_URL}/maintenance/`),
    getById: (id) => axios.get(`${API_BASE_URL}/maintenance/${id}`),
    getByTechnicianId: (id) => axios.get(`${API_BASE_URL}/maintenance/technician/${id}`),
    getByAircraftId: (id) => axios.get(`${API_BASE_URL}/maintenance/aircraft/${id}`),
    put: (payload, id) => axios.put(`${API_BASE_URL}/maintenance/${id}`, payload),
    delete: (id) => axios.delete(`${API_BASE_URL}/maintenance/${id}`)
  },

  order: {
    post: (payload) => axios.post(`${API_BASE_URL}/order`, payload),
    get: () => axios.get(`${API_BASE_URL}/order/`),
    getOne: (id) => axios.get(`${API_BASE_URL}/order/${id}`),
    put: (payload, id) => axios.put(`${API_BASE_URL}/order/${id}`, payload),
    delete: (id) => axios.delete(`${API_BASE_URL}/order/${id}`)
  },

  part: {
    post: (payload) => axios.post(`${API_BASE_URL}/part`, payload),
    get: () => axios.get(`${API_BASE_URL}/part/`),
    getOne: (id) => axios.get(`${API_BASE_URL}/part/${id}`),
    put: (payload, id) => axios.put(`${API_BASE_URL}/part/${id}`, payload),
    delete: (id) => axios.delete(`${API_BASE_URL}/part/${id}`)
  },

  dashboard: {
    getFlightsOfCurrentWeek: () => axios.get(`${API_BASE_URL}/dashboard/flights/current-week`),
    getMaintenanceActivities: () => axios.get(`${API_BASE_URL}/dashboard/maintenance-activities`),
    getResponseTimePercentage: () => axios.get(`${API_BASE_URL}/dashboard/response-time-percentage`),
    getAveragePriority: () => axios.get(`${API_BASE_URL}/dashboard/average-risk`),
    getAveragePriorityPerMonth: () => axios.get(`${API_BASE_URL}/dashboard/average-priority-per-month`),
    getMetrics: () => axios.get(`${API_BASE_URL}/dashboard/metrics`)
  },

  reports: {
    getComplianceReports: () => axios.get(`${API_BASE_URL}/reports/compliance-reports`)
  },

  notifications: {
    getNotifications: () => axios.get(`${API_BASE_URL}/notifications`)
  }
};

export default api;
