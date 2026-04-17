import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { LayoutDashboard, Users, TrendingUp, AlertCircle, CheckCircle2, Search, Filter, Download, BrainCircuit, ChevronRight } from 'lucide-react';
import { generateSyntheticData } from './dataService';
import { Employee } from './types';
import { cn } from './lib/utils';

export default function App() {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('All');
  const [selectedEmp, setSelectedEmp] = React.useState<Employee | null>(null);

  React.useEffect(() => {
    setEmployees(generateSyntheticData(40));
  }, []);

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.id.includes(searchTerm);
    const matchesDept = filterDept === 'All' || emp.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const stats = {
    total: employees.length,
    high: employees.filter(e => e.predictedPerformance === 'High').length,
    medium: employees.filter(e => e.predictedPerformance === 'Medium').length,
    low: employees.filter(e => e.predictedPerformance === 'Low').length,
    avgConfidence: (employees.reduce((acc, curr) => acc + curr.confidenceScore, 0) / employees.length * 100).toFixed(1)
  };

  const chartData = [
    { name: 'High', value: stats.high, color: '#10b981' },
    { name: 'Medium', value: stats.medium, color: '#f59e0b' },
    { name: 'Low', value: stats.low, color: '#ef4444' },
  ];

  const deptData = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'].map(dept => ({
    name: dept,
    score: (employees.filter(e => e.department === dept).reduce((acc, curr) => acc + curr.managerScore, 0) / employees.filter(e => e.department === dept).length || 0).toFixed(2)
  }));

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
            <BrainCircuit className="w-8 h-8" />
            <span>AI Talent</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium tracking-wider uppercase">HR Analytics Engine</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button className="flex items-center gap-3 w-full p-3 bg-indigo-50 text-indigo-600 rounded-xl font-medium transition-all">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          <button className="flex items-center gap-3 w-full p-3 text-slate-500 hover:bg-slate-50 rounded-xl font-medium transition-all">
            <Users className="w-5 h-5" />
            Team View
          </button>
          <button className="flex items-center gap-3 w-full p-3 text-slate-500 hover:bg-slate-50 rounded-xl font-medium transition-all">
            <TrendingUp className="w-5 h-5" />
            Projections
          </button>
        </nav>

        <div className="p-4 mt-auto border-t border-slate-100">
          <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg shadow-indigo-200">
            <p className="text-xs font-semibold text-slate-400 mb-1">DATA INTEGRITY</p>
            <p className="text-sm font-medium">Model Confidence</p>
            <div className="mt-2 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${stats.avgConfidence}%` }} />
            </div>
            <p className="text-[10px] mt-1 text-right text-indigo-300">{stats.avgConfidence}%</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 p-4 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Performance Predictor</h1>
            <p className="text-sm text-slate-500">Q2 2026 Appraisal Readiness</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search employees..." 
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 shadow-sm bg-white">
              <Download className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </header>

        {/* Dashboard Sections */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Scanned', value: stats.total, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'High Potential', value: stats.high, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Moderate Risk', value: stats.medium, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Critical Alert', value: stats.low, icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-3 rounded-xl", s.bg)}>
                    <s.icon className={cn("w-6 h-6", s.color)} />
                  </div>
                  <span className="text-2xl font-bold text-slate-800">{s.value}</span>
                </div>
                <p className="text-sm font-medium text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                   Performance Distribution
                   <span className="text-xs font-normal text-slate-400 ml-auto">Sample: N={stats.total}</span>
                </h3>
                <div className="h-64 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: '#f8fafc' }}
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Employee Table */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                  <h3 className="text-lg font-bold">Predictive Roster</h3>
                  <button className="text-sm text-indigo-600 font-semibold hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50/50 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        <th className="px-6 py-4">Employee</th>
                        <th className="px-6 py-4">Department</th>
                        <th className="px-6 py-4">Manager Rating</th>
                        <th className="px-6 py-4 text-center">Prediction</th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredEmployees.slice(0, 8).map((emp) => (
                        <tr 
                          key={emp.id} 
                          className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                          onClick={() => setSelectedEmp(emp)}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center font-bold text-slate-400">
                                {emp.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-800">{emp.name}</p>
                                <p className="text-xs text-slate-400">{emp.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-medium text-slate-600">{emp.department}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className={cn(
                                    "h-full rounded-full transition-all duration-1000",
                                    emp.managerScore > 4 ? 'bg-emerald-500' : emp.managerScore > 3 ? 'bg-indigo-500' : 'bg-rose-500'
                                  )} 
                                  style={{ width: `${(emp.managerScore / 5) * 100}%` }} 
                                />
                              </div>
                              <span className="text-xs font-bold text-slate-500">{emp.managerScore.toFixed(1)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={cn(
                              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                              emp.predictedPerformance === 'High' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                              emp.predictedPerformance === 'Medium' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                              'bg-rose-50 border-rose-100 text-rose-700'
                            )}>
                              {emp.predictedPerformance}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors inline" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Analysis Sidebar (Insight Card) */}
            <div className="space-y-8">
              {selectedEmp ? (
                <div className="bg-slate-900 text-white rounded-3xl p-8 sticky top-24 border border-slate-800 shadow-2xl overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700" />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-2xl font-bold shadow-lg shadow-indigo-500/20">
                        {selectedEmp.name.charAt(0)}
                      </div>
                      <span className="text-[10px] font-bold uppercase border border-slate-700 px-2 py-1 rounded tracking-tighter text-slate-400">
                        CONFIDENCE: {(selectedEmp.confidenceScore * 100).toFixed(0)}%
                      </span>
                    </div>

                    <h2 className="text-2xl font-extrabold tracking-tight mb-1">{selectedEmp.name}</h2>
                    <p className="text-slate-400 text-sm font-medium mb-8">Role: L{selectedEmp.jobLevel} • {selectedEmp.department}</p>

                    <div className="space-y-6">
                      <section>
                        <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                           <TrendingUp className="w-3 h-3" />
                           Predictive Drivers
                        </h4>
                        <div className="flex flex-wrap gap-2 text-xs">
                          {selectedEmp.topDrivers.map((d, i) => (
                            <span key={i} className="bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700">
                              {d}
                            </span>
                          ))}
                        </div>
                      </section>

                      <section>
                        <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                           <LayoutDashboard className="w-3 h-3" />
                           Strategic Recs
                        </h4>
                        <ul className="space-y-2">
                          {selectedEmp.recommendations.map((r, i) => (
                            <li key={i} className="text-sm font-medium flex gap-2 items-start opacity-90">
                              <div className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </section>
                      
                      <div className="pt-4 border-t border-slate-800">
                        <div className="flex justify-between text-xs mb-1 font-bold text-slate-400">
                           <span>ON-TIME SHIP RATE</span>
                           <span className="text-white">{(selectedEmp.onTimeDeliveryRate * 100).toFixed(0)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full" style={{ width: `${selectedEmp.onTimeDeliveryRate * 100}%` }} />
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-8 py-4 bg-white text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors shadow-lg shadow-white/10" onClick={() => setSelectedEmp(null)}>
                      Close Profile
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center text-slate-400 min-h-[400px]">
                  <BrainCircuit className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-sm font-medium">Select an employee from the roster<br/>to generate AI evaluation</p>
                </div>
              )}

              <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200">
                <h3 className="text-lg font-bold mb-2">Pro Tip: HR Analyst</h3>
                <p className="text-slate-100 text-xs leading-relaxed opacity-80">
                  Employees with high "Manager Scores" but low "Peer Scores" are at high risk for cultural friction. Review collaborative metrics before finalizing Q2 ratings.
                </p>
                <button className="mt-4 px-4 py-2 bg-indigo-500 rounded-lg text-xs font-bold hover:bg-indigo-400 transition-colors">
                  Run Cross-Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
