export interface Employee {
  id: string;
  name: string;
  department: 'Engineering' | 'Sales' | 'Marketing' | 'HR' | 'Finance';
  jobLevel: 1 | 2 | 3 | 4 | 5;
  experienceYears: number;
  onTimeDeliveryRate: number; // 0 to 1
  bugCount: number;
  trainingHours: number;
  peerFeedbackScore: number; // 0 to 5
  managerScore: number; // 0 to 5
  attendanceRate: number; // 0 to 1
  projectsCount: number;
  predictedPerformance: 'High' | 'Medium' | 'Low';
  confidenceScore: number;
  topDrivers: string[];
  recommendations: string[];
}

export interface DepartmentStats {
  name: string;
  avgPerformance: number;
  headcount: number;
  highPerformers: number;
}
