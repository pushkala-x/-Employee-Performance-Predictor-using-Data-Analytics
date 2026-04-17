import { Employee } from './types';

const NAMES = ['Arjun Mehta', 'Priya Sharma', 'Rohan Das', 'Ananya Iyer', 'Vikram Singh', 'Sanya Kapoor', 'Rahul Verma', 'Ishita Gupta', 'Amit Patel', 'Sneha Reddy', 'Kabir Malhotra', 'Meera Nair', 'Aditya Joshi', 'Zoya Khan', 'Sameer Deshmukh'];
const DEPARTMENTS: Employee['department'][] = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'];

export function generateSyntheticData(count: number = 20): Employee[] {
  return Array.from({ length: count }, (_, i) => {
    const department = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
    const exp = Math.floor(Math.random() * 15) + 1;
    const otdr = 0.6 + Math.random() * 0.4;
    const bugCount = department === 'Engineering' ? Math.floor(Math.random() * 20) : 0;
    const training = Math.floor(Math.random() * 40) + 10;
    const peerScore = 3 + Math.random() * 2;
    const managerScore = 2.5 + Math.random() * 2.5;
    
    // Simplified Logic for "Prediction" (Mimicking a model)
    let score = (otdr * 0.3) + (peerScore / 5 * 0.3) + (managerScore / 5 * 0.4);
    if (bugCount > 10) score -= 0.1;
    if (training > 30) score += 0.05;

    let predictedPerformance: 'High' | 'Medium' | 'Low' = 'Medium';
    if (score > 0.8) predictedPerformance = 'High';
    else if (score < 0.6) predictedPerformance = 'Low';

    const drivers = [];
    if (otdr > 0.9) drivers.push('High Delivery Velocity');
    if (peerScore > 4.5) drivers.push('Strong Collaboration');
    if (training > 35) drivers.push('Active Skill Growth');
    if (bugCount > 15) drivers.push('High Defect Density');
    if (managerScore < 3) drivers.push('Manager Alignment Issues');

    const recs = [];
    if (predictedPerformance === 'Low') recs.push('MANDATORY: Performance Improvement Plan (PIP)');
    if (training < 15) recs.push('Recommend Advanced Technical Workshop');
    if (predictedPerformance === 'High') recs.push('Nominate for Leadership Fast-track');

    return {
      id: `EMP-${1000 + i}`,
      name: NAMES[Math.floor(Math.random() * NAMES.length)] + (i > NAMES.length ? ` ${i}` : ''),
      department,
      jobLevel: (Math.floor(Math.random() * 5) + 1) as any,
      experienceYears: exp,
      onTimeDeliveryRate: otdr,
      bugCount,
      trainingHours: training,
      peerFeedbackScore: peerScore,
      managerScore,
      attendanceRate: 0.9 + Math.random() * 0.1,
      projectsCount: Math.floor(Math.random() * 8) + 2,
      predictedPerformance,
      confidenceScore: 0.75 + Math.random() * 0.2,
      topDrivers: drivers.slice(0, 3),
      recommendations: recs.length > 0 ? recs : ['Maintain Current Trajectory']
    };
  });
}
