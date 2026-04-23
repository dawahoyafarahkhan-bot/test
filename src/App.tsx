/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Briefcase, 
  Database, 
  Settings, 
  Activity, 
  Zap, 
  TrendingUp, 
  CloudLightning,
  ChevronRight,
  Terminal,
  ShieldCheck,
  Search,
  Bell,
  User,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Upload,
  Plus,
  BarChart3,
  Cpu,
  Library,
  Info,
  Container,
  FolderOpen,
  HelpCircle,
  Box
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { 
  cn, 
  API_ASSETS, 
  ApiAsset, 
  PROVINCES, 
  NODES, 
  BUSINESS_CAPABILITIES, 
  CAPABILITY_CATEGORIES, 
  DATA_SERVICE_CAPABILITIES,
  DATA_SERVICE_CATEGORIES,
  COMMON_SERVICE_CAPABILITIES,
  COMMON_SERVICE_CATEGORIES,
  ENGINE_SERVICE_CAPABILITIES,
  ENGINE_SERVICE_CATEGORIES,
  BusinessCapability 
} from './lib/utils';

// --- Mock Data ---
const LOAD_PREDICTION_DATA = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  actual: Math.floor(650 + Math.random() * 100),
  predicted: Math.floor(650 + Math.random() * 100 + (Math.sin(i / 3) * 50)),
}));

const REVENUES = [
  { name: '能源效率', val: 4000 },
  { name: '交易增值', val: 3000 },
  { name: '资产管理', val: 2000 },
  { name: '碳汇收益', val: 2780 },
];

// --- Sub-components ---

const StatCard = ({ title, value, unit, icon: Icon, color }: { title: string, value: string, unit: string, icon: any, color: string }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={cn("p-2 rounded-lg", color)}>
        <Icon size={20} className="text-white" />
      </div>
      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
    </div>
    <div>
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold flex items-baseline gap-1">
        {value} <span className="text-sm font-normal text-gray-400">{unit}</span>
      </h3>
    </div>
  </div>
);

// --- Views ---

function DashboardView() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">平台运行实时看板</h1>
          <p className="text-gray-500 mt-1 text-sm">监控中台四类核心模块的工作负载与API调用统计数据。</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            导出报告 <ExternalLink size={14} />
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200">
            刷新数据
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="API 累计调用" value="2.4M" unit="次" icon={Activity} color="bg-blue-500" />
        <StatCard title="模型算力负载" value="64.2" unit="TFlops" icon={BrainCircuit} color="bg-cyan-500" />
        <StatCard title="托管能耗资产" value="12,504" unit="台" icon={Cpu} color="bg-purple-500" />
        <StatCard title="数据共享增益" value="¥14.8" unit="k" icon={TrendingUp} color="bg-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <CloudLightning size={18} className="text-blue-500" />
              电力负荷实时预测 (MaaS 输出)
            </h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-100 border border-blue-400" /> 实际负荷</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-500 shadow-sm shadow-blue-500" /> 预测负荷</div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LOAD_PREDICTION_DATA}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="predicted" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
                <Area type="monotone" dataKey="actual" stroke="#DBEAFE" strokeWidth={1} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <BarChart3 size={18} className="text-green-500" />
            能力应用分布比例
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUES} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748B'}} width={80} />
                <Tooltip 
                   cursor={{fill: '#F8FAFC'}}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="val" fill="#10B981" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs">
            <span className="text-gray-500 text-xs">总计业务增值</span>
            <span className="font-bold text-green-600">¥12,450.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Modal Component ---

const FinetuneModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-xl bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">新建模型</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"><X size={20}/></button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh] custom-scrollbar space-y-6">
          {/* Model Settings Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">模型设置</h3>
            <div className="space-y-4">
               <div className="grid grid-cols-3 items-center">
                  <span className="text-sm text-gray-500">基础模型</span>
                  <div className="col-span-2 relative">
                     <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm outline-none appearance-none focus:border-blue-500 focus:bg-white transition-all text-gray-700">
                        <option value="wind">Kaiwu-TSM-WindV0.1</option>
                        <option value="solar">Kaiwu-TSM-SolarV0.1</option>
                        <option value="load">Kaiwu-TSM-LoadV0.1</option>
                     </select>
                     <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
               </div>
               <div className="grid grid-cols-3 items-center">
                  <span className="text-sm text-gray-500">预测目标</span>
                  <span className="col-span-2 text-sm font-semibold text-gray-700">光伏功率预测</span>
               </div>
               <div className="grid grid-cols-3 items-center">
                  <span className="text-sm text-gray-500">时区</span>
                  <div className="col-span-2 relative">
                     <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm outline-none appearance-none focus:border-blue-500 focus:bg-white transition-all text-gray-700">
                        <option>Asia/Shanghai</option>
                        <option>UTC</option>
                     </select>
                     <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
               </div>
               <div className="grid grid-cols-3 items-center">
                  <label className="text-sm text-gray-500 flex items-center gap-1">
                     <span className="text-red-500">*</span> 模型名称
                  </label>
                  <input type="text" className="col-span-2 bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all" placeholder="请输入模型名称" />
               </div>
            </div>
          </div>

          {/* Upload Data Section */}
          <div className="space-y-4">
             <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">上传数据</h3>
                <span className="text-[10px] text-gray-400 flex items-center gap-1 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
                   上传格式见 <a href="#" className="text-blue-500 hover:underline">数据模版</a> <Upload size={10}/>
                </span>
             </div>
             <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                   <input type="radio" name="dataType" defaultChecked className="hidden peer" />
                   <div className="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 flex items-center justify-center p-0.5">
                      <div className="w-full h-full rounded-full bg-white opacity-0 peer-checked:opacity-100" />
                   </div>
                   <span className="text-sm text-gray-600">新数据</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                   <input type="radio" name="dataType" className="hidden peer" />
                   <div className="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 flex items-center justify-center p-0.5">
                      <div className="w-full h-full rounded-full bg-white opacity-0 peer-checked:opacity-100" />
                   </div>
                   <span className="text-sm text-gray-400">已有数据</span>
                </label>
             </div>
             
             <div className="border-2 border-dashed border-gray-100 bg-gray-50/50 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:bg-gray-50 hover:border-blue-100 transition-all cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                   <FolderOpen size={28} />
                </div>
                <div className="text-center">
                   <p className="text-sm font-bold text-gray-700">点击或将文件拖拽至此上传</p>
                   <p className="text-xs text-gray-400 mt-1">支持扩展名：.csv, .xlsx, .txt</p>
                </div>
             </div>
          </div>

          {/* 解析详情 & 设置 */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
             <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                <div className="h-[1px] bg-gray-100 flex-1" /> 解析信息项目 & 设置 <div className="h-[1px] bg-gray-100 flex-1" />
             </div>

             <div className="space-y-5">
                <div className="flex items-center justify-between group cursor-pointer p-1">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-6 rounded-full bg-blue-100 mr-1" />
                      <span className="text-sm font-bold text-gray-700">场站信息</span>
                   </div>
                   <ChevronUp size={16} className="text-gray-400" />
                </div>

                <div className="space-y-4">
                   <div className="flex items-center justify-between group cursor-pointer p-1">
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-6 rounded-full bg-blue-600 mr-1" />
                         <span className="text-sm font-bold text-gray-700">数据划分策略</span>
                         <HelpCircle size={14} className="text-gray-400 hover:text-blue-500 transition-colors" />
                      </div>
                   </div>
                   
                   <div className="space-y-4 px-3">
                      <div className="flex justify-between text-xs font-medium">
                         <span className="text-gray-500">训练比例: <span className="text-gray-900 font-bold">-- %</span></span>
                         <span className="text-gray-500">测试比例: <span className="text-gray-900 font-bold">-- %</span></span>
                      </div>
                      <div className="relative h-2 flex items-center px-1">
                         <div className="absolute inset-x-0 h-1.5 bg-gray-100 top-1/2 -translate-y-1/2 rounded-full" />
                         <div className="absolute left-0 w-3 h-3 bg-white border-2 border-blue-500 rounded-full shadow-lg cursor-pointer transform -translate-y-1/2 top-1/2" />
                      </div>
                      <div className="space-y-1 bg-gray-50 p-3 rounded-lg border border-gray-100">
                         <p className="text-[11px] text-gray-500 font-medium">训练时间范围：未选择</p>
                         <p className="text-[11px] text-gray-500 font-medium">测试时间范围：未选择</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-8 py-5 bg-gray-50/50 border-t border-gray-100">
           <button onClick={onClose} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors">取消</button>
           <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">确定并开始训练</button>
        </div>
      </motion.div>
    </div>
  );
};

// --- Specialized Mock Data ---
const LOSS_CURVE_DATA = Array.from({ length: 150 }, (_, i) => ({
  epoch: i,
  train: 4.5 * Math.exp(-i / 30) + Math.random() * 0.1,
  val: 5.0 * Math.exp(-i / 35) + 0.2 + Math.random() * 0.15,
}));

const SPOT_PRICE_DATA = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  price: 350 + Math.random() * 200 + (i > 18 ? 300 : 0),
}));

// --- Sub-components for MaaS ---

const TimeSeriesWorkbench = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex h-full gap-6">
      <FinetuneModal isOpen={showModal} onClose={() => setShowModal(false)} />
      {/* Left List */}
      <div className="w-80 flex flex-col gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 shrink-0">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-gray-800">微调模型列表</h3>
             <button 
                onClick={() => setShowModal(true)}
                className="p-1 px-3 bg-blue-600 text-white text-[11px] font-bold rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-100"
             >
                微调模型
             </button>
          </div>
          <div className="relative mb-4">
             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input type="text" placeholder="输入关键字查询..." className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs outline-none focus:border-blue-200 focus:bg-white transition-all" />
          </div>
          <div className="space-y-2">
            {[
              { name: 'demo_load_finetune', time: '2026/05/13', status: '已完成' },
              { name: 'solar_forecast_v2', time: '2026/05/12', status: '训练中' }
            ].map((item, idx) => (
              <div key={idx} className={cn("p-3 rounded-xl border transition-all cursor-pointer", idx === 0 ? "bg-blue-50/50 border-blue-100" : "bg-white border-transparent hover:bg-gray-50")}>
                <div className="flex justify-between items-center mb-1">
                   <span className="text-sm font-bold text-gray-800">{item.name}</span>
                   <span className="text-[10px] text-gray-400 font-mono">{item.time}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className={cn("w-1.5 h-1.5 rounded-full", item.status === '已完成' ? "bg-green-500" : "bg-blue-500")} />
                  <span className="text-[10px] text-gray-500">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Detail Area */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 flex flex-col min-w-0">
        <div className="p-6 border-b border-gray-50 flex justify-between items-start">
          <div className="space-y-4 flex-1">
             <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold">demo_load_finetune</h2>
                <span className="text-[10px] text-gray-400 font-mono bg-gray-100 px-3 py-1 rounded-full">key: c3f790e9-f044-4785-a033-667997a4</span>
                <span className="ml-auto text-green-600 bg-green-50 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" /> 已完成 04:32
                </span>
             </div>
             
             <div className="grid grid-cols-4 gap-8">
                <div>
                   <p className="text-xs text-gray-400 mb-1">基础模型</p>
                   <p className="text-sm font-semibold text-gray-700">Kaiwu-TSM-LoadV0.1</p>
                </div>
                <div>
                   <p className="text-xs text-gray-400 mb-1">预测目标</p>
                   <p className="text-sm font-semibold text-gray-700">全网负荷预测</p>
                </div>
                <div>
                   <p className="text-xs text-gray-400 mb-1">训练集</p>
                   <p className="text-sm font-semibold text-blue-600 flex items-center gap-1">负荷预测微调示例.xlsx <ExternalLink size={12}/></p>
                </div>
                <div>
                   <p className="text-xs text-gray-400 mb-1">API调用</p>
                   <p className="text-sm font-semibold text-blue-600 flex items-center gap-1 cursor-pointer hover:underline">复制详情 <Terminal size={12}/></p>
                </div>
             </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <h4 className="text-sm font-bold text-gray-800">模型训练&测试 (Loss)</h4>
                 <div className="h-64 w-full bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={LOSS_CURVE_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="epoch" hide />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                        <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: 12, paddingBottom: 20}} />
                        <Line type="monotone" dataKey="train" name="训练损失" stroke="#3B82F6" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="val" name="验证损失" stroke="#F43F5E" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-sm font-bold text-gray-800">训练日志流</h4>
                 <div className="h-64 w-full bg-gray-900 rounded-xl p-4 font-mono text-[11px] text-gray-300 overflow-y-auto custom-scrollbar shadow-inner">
                    {[
                      '17:19:26 开始运行...',
                      '17:19:27 开始加载微调数据集',
                      '17:19:32 验证文件格式成功',
                      '17:19:42 模型分层解冻... 对应算力分配成功',
                      '17:19:50 1/150 EPOCH - loss: 4.542 - val_loss: 5.120',
                      '17:20:05 10/150 EPOCH - loss: 3.120 - val_loss: 3.884',
                      '17:20:45 进度已保存: checkpoint_v1.pth',
                      '17:23:55 训练完成。测试集准确率: 99.22%'
                    ].map((log, i) => (
                      <div key={i} className="flex gap-4 py-1">
                        <span className="text-gray-500 whitespace-nowrap">{log.split(' ')[0]}</span>
                        <span className={log.includes('准确率') ? 'text-green-400' : ''}>{log.split(' ').slice(1).join(' ')}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              <div className="flex justify-between items-center">
                 <h4 className="text-sm font-bold text-gray-800">微调后预测对比 (全网负荷)</h4>
                 <div className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100 font-bold">测试集准确率: 99.22%</div>
              </div>
              <div className="h-64 w-full bg-blue-50/20 rounded-xl p-4 border border-blue-50">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={LOAD_PREDICTION_DATA}>
                     <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                     <Tooltip />
                     <Area type="monotone" dataKey="predicted" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} strokeWidth={2} name="预测结果" />
                     <Area type="monotone" dataKey="actual" stroke="#94A3B8" fill="transparent" strokeDasharray="5 5" name="实际观测" />
                   </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const SpecializedAIWorkbench = () => {
  const [selectedModel, setSelectedModel] = useState(API_ASSETS.find(a => a.type === 'spot_price')!);
  const [viewMode, setViewMode] = useState<'operation' | 'api'>('operation');
  const [province, setProvince] = useState(PROVINCES[0]);
  const [node, setNode] = useState(NODES[PROVINCES[0]][0]);

  const isNodePrice = selectedModel.id === 'm-sp-3';
  
  // Multi-day price data generation
  const multiDayData = useMemo(() => {
    const pointsPerDay = isNodePrice ? 96 : 24;
    const step = isNodePrice ? 15 : 60;
    const days = ['昨日', '今日', '明日'];
    
    let allData: any[] = [];
    
    days.forEach((day, dIdx) => {
      for (let i = 0; i < pointsPerDay; i++) {
        const totalMinutes = i * step;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const timeStr = `${day} ${hours}:${minutes === 0 ? '00' : minutes}`;
        
        const base = 300 + (Math.sin((i + dIdx * pointsPerDay) / 10) * 100);
        const rand = Math.random() * 50;
        
        const item: any = { time: timeStr, fullTime: `${day} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}` };
        
        if (day === '昨日') {
          item.yesterdayActual = base + rand;
          item.yesterdayPred = base + rand + (Math.random() * 20 - 10);
        } else if (day === '今日') {
          item.todayPred = base + rand + 20;
        } else if (day === '明日') {
          item.tomorrowPred = base + rand - 10;
        }
        
        allData.push(item);
      }
    });
    
    return allData;
  }, [isNodePrice]);

  return (
    <div className="flex h-full gap-6">
      <div className="w-80 flex flex-col gap-4">
        {API_ASSETS.filter(a => a.type === 'spot_price').map(model => (
           <div 
             key={model.id}
             onClick={() => setSelectedModel(model)}
             className={cn(
               "p-4 rounded-xl border transition-all cursor-pointer group shadow-sm",
               selectedModel.id === model.id ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-100 text-gray-900 hover:border-blue-200"
             )}
           >
             <div className="flex items-center gap-3 mb-2">
               <TrendingUp size={18} className={selectedModel.id === model.id ? "text-white" : "text-blue-600"} />
               <span className="text-sm font-bold truncate">{model.name}</span>
             </div>
             <p className={cn("text-xs line-clamp-2", selectedModel.id === model.id ? "text-blue-50" : "text-gray-500")}>
               {model.description}
             </p>
           </div>
        ))}
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-gray-100 flex flex-col min-w-0 overflow-hidden text-gray-900">
        <div className="px-6 h-16 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
             <h2 className="font-bold text-gray-800">{selectedModel.name}</h2>
             <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => setViewMode('operation')}
                  className={cn("px-4 py-1 text-xs font-bold rounded-md transition-all", viewMode === 'operation' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500")}
                >功能操作</button>
                <button 
                  onClick={() => setViewMode('api')}
                  className={cn("px-4 py-1 text-xs font-bold rounded-md transition-all", viewMode === 'api' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500")}
                >API集成</button>
             </div>
          </div>
          <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{selectedModel.version}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
           <AnimatePresence mode="wait">
             {viewMode === 'operation' ? (
               <motion.div 
                 key="op" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="space-y-6 h-full flex flex-col"
               >
                 <div className="bg-blue-50/30 p-5 rounded-2xl border border-blue-50">
                    <div className="space-y-3">
                       <label className="text-xs font-bold text-gray-500 uppercase">预测省份与节点</label>
                       <div className="flex items-center gap-6">
                          <div className="flex flex-wrap gap-2 text-xs">
                             {PROVINCES.map(p => (
                               <button 
                                 key={p} 
                                 onClick={() => setProvince(p)}
                                 className={cn(
                                   "px-4 py-2 rounded-lg font-medium transition-all relative overflow-hidden", 
                                   province === p ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50",
                                   p !== '山东' && "pr-6"
                                 )}
                               >
                                 {p}
                                 {p !== '山东' && <ShieldCheck size={10} className="absolute top-1 right-1 text-gray-300" />}
                               </button>
                             ))}
                          </div>
                          {isNodePrice && province === '山东' && (
                             <select 
                               value={node} 
                               onChange={(e) => setNode(e.target.value)}
                               className="bg-white border border-gray-100 rounded-lg p-2 text-xs outline-none focus:border-blue-200"
                             >
                                {NODES[province]?.map(n => <option key={n} value={n}>{n}</option>)}
                             </select>
                          )}
                       </div>
                    </div>
                 </div>

                 <AnimatePresence mode="wait">
                   {province === '山东' ? (
                     <motion.div 
                       key="shandong-full" 
                       initial={{ opacity: 0, y: 10 }} 
                       animate={{ opacity: 1, y: 0 }} 
                       exit={{ opacity: 0, y: -10 }}
                       className="flex-1 flex flex-col gap-6 min-h-0"
                     >
                        {/* Metrics on TOP */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                           {[
                             { label: '昨日均价(实际)', val: '¥412.3', sub: 'vs 预测偏差 -1.2%' },
                             { label: '今日均价(预)', val: '¥428.5', sub: '环比昨日 +3.9%' },
                             { label: '明日均价(预)', val: '¥445.1', sub: '持续波动上升' },
                             { label: '价格峰值预测', val: '¥782.1', sub: '预测出现在明日 19:15' },
                           ].map((stat, i) => (
                             <div key={i} className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                                <p className="text-[10px] font-bold text-gray-400 uppercase">{stat.label}</p>
                                <div className="flex items-baseline gap-1 mt-1 font-bold text-gray-800">
                                   <span className="text-lg">{stat.val}</span>
                                   <span className="text-[10px] font-normal text-gray-400">/MWh</span>
                                </div>
                                <p className="text-[9px] text-blue-600 mt-0.5">{stat.sub}</p>
                             </div>
                           ))}
                        </div>

                        <div className="flex-1 min-h-0 space-y-4 flex flex-col">
                           <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg">
                              <h4 className="text-xs font-bold text-gray-800">
                                三日连续电价走势分析表 (昨日-今日-明日)
                              </h4>
                              <div className="flex gap-4 text-[10px] font-bold">
                                 <span className="flex items-center gap-1.5 text-blue-700"><span className="w-2.5 h-0.5 bg-blue-600"/> 昨日实际</span>
                                 <span className="flex items-center gap-1.5 text-amber-500"><span className="w-2.5 h-0.5 bg-amber-500 border-t border-dashed border-gray-400"/> 昨日预测</span>
                                 <span className="flex items-center gap-1.5 text-amber-600"><span className="w-2.5 h-0.5 bg-amber-500"/> 今日预测</span>
                                 <span className="flex items-center gap-1.5 text-amber-600/80"><span className="w-2.5 h-0.5 bg-amber-500 opacity-60"/> 明日预测</span>
                              </div>
                           </div>
                           <div className="flex-1 w-full bg-white border border-gray-100 rounded-2xl p-4 min-h-[300px]">
                             <ResponsiveContainer width="100%" height="100%">
                               <LineChart data={multiDayData}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                  <XAxis 
                                    dataKey="time" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 9}} 
                                    interval={isNodePrice ? 23 : 5}
                                  />
                                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                                  <Tooltip 
                                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '11px'}}
                                    labelClassName="font-bold text-gray-800"
                                  />
                                  <Line name="昨日实际" type="monotone" dataKey="yesterdayActual" stroke="#2563EB" strokeWidth={2.5} dot={false} connectNulls />
                                  <Line name="昨日预测" type="monotone" dataKey="yesterdayPred" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" dot={false} connectNulls />
                                  <Line name="今日预测" type="monotone" dataKey="todayPred" stroke="#F59E0B" strokeWidth={2.5} dot={false} connectNulls />
                                  <Line name="明日预测" type="monotone" dataKey="tomorrowPred" stroke="#F59E0B" strokeWidth={2} strokeOpacity={0.6} dot={false} connectNulls />
                               </LineChart>
                             </ResponsiveContainer>
                           </div>
                        </div>
                     </motion.div>
                   ) : (
                     <motion.div 
                        key="no-permission" 
                        initial={{ opacity: 0, scale: 0.98 }} 
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-12 flex flex-col items-center text-center space-y-4"
                     >
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-2">
                           <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">暂无该省份模型调用权限</h3>
                        <p className="text-gray-500 max-w-sm text-sm">
                           您当前使用的 <span className="font-bold text-blue-600 italic">"PaaS 基础开发者套餐"</span> 仅包含山东试点区域的现货价格模型权限。
                        </p>
                        <div className="flex gap-3 pt-4">
                           <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                              购买商业化增值套餐
                           </button>
                           <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50">
                              联系中台运营专家
                           </button>
                        </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </motion.div>
             ) : (
               <motion.div 
                 key="api" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="space-y-6"
               >
                  <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden shadow-2xl">
                     <div className="flex items-center gap-2 text-cyan-400 text-xs mb-4 font-mono">
                        <Terminal size={14} />
                        <span>HTTP Request Sandbox</span>
                     </div>
                     <div className="font-mono text-sm space-y-4 text-gray-300">
                        <p><span className="text-pink-400">POST</span> {selectedModel.endpoint}</p>
                        <p className="text-gray-500">// Request Payload</p>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                           <p>{'{'}</p>
                           <p className="pl-4"><span className="text-blue-300">"province"</span>: <span className="text-yellow-200">"{province}"</span>,</p>
                           {isNodePrice && <p className="pl-4"><span className="text-blue-300">"node_id"</span>: <span className="text-yellow-200">"N-山东-济南-01"</span>,</p>}
                           <p className="pl-4"><span className="text-blue-300">"interval"</span>: <span className="text-yellow-200">"{isNodePrice ? '15min' : '1hour'}"</span>,</p>
                           <p className="pl-4"><span className="text-blue-300">"market_type"</span>: <span className="text-yellow-200">"spot"</span>,</p>
                           <p>{'}'}</p>
                        </div>
                     </div>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

function PredictiveMaintenanceWorkbench() {
  const maintenanceModels = API_ASSETS.filter(a => a.type === 'asset_maintenance');
  const [selectedId, setSelectedId] = useState<string | null>(maintenanceModels[0]?.id || null);
  const selectedModel = maintenanceModels.find(m => m.id === selectedId);

  return (
    <div className="h-full flex gap-6 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Sidebar List */}
      <div className="w-80 border-r border-gray-50 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-50 bg-gray-50/10">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">诊断能力清单</h4>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {maintenanceModels.map(model => (
            <button
              key={model.id}
              onClick={() => setSelectedId(model.id)}
              className={cn(
                "w-full p-4 text-left border-b border-gray-50 transition-all group",
                selectedId === model.id ? "bg-blue-50/50" : "hover:bg-gray-50"
              )}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded tracking-tighter uppercase whitespace-nowrap">
                   {model.version}
                </span>
                <ChevronRight size={14} className={cn("transition-transform", selectedId === model.id ? "text-blue-600 translate-x-1" : "text-gray-300")} />
              </div>
              <h5 className={cn("text-sm font-bold truncate transition-colors", selectedId === model.id ? "text-blue-700" : "text-gray-700")}>{model.name}</h5>
              <p className="text-[10px] text-gray-400 mt-1 line-clamp-1 italic">"{model.description}"</p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <AnimatePresence mode="wait">
          {selectedModel ? (
            <motion.div
              key={selectedModel.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8 max-w-4xl"
            >
              <div className="flex justify-between items-start">
                <div>
                   <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                     {selectedModel.subCategory}
                   </span>
                   <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{selectedModel.name}</h2>
                </div>
                <div className="flex gap-2">
                   <button className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all">
                      接口文档
                   </button>
                   <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                      立即测试
                   </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <BrainCircuit size={14} /> 核心预测逻辑
                  </h4>
                  <div className="p-5 bg-gradient-to-br from-blue-50/50 to-cyan-50/30 border border-blue-100 rounded-2xl text-sm text-gray-700 leading-relaxed">
                    {selectedModel.core}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Info size={14} /> 模型特征
                  </h4>
                  <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm text-gray-600 leading-relaxed italic">
                    "{selectedModel.description}"
                  </div>
                </div>
              </div>

              <section className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Container size={14} /> 原子化参数定义
                </h4>
                <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm">
                   <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50/50 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                         <tr>
                            <th className="px-6 py-4">节点类型</th>
                            <th className="px-6 py-4">参数详情 / 业务描述</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 font-sans">
                         <tr className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                  <span className="font-bold text-gray-800">输入参数 (Request)</span>
                               </div>
                            </td>
                            <td className="px-6 py-4 text-gray-500 font-mono text-xs">{selectedModel.input}</td>
                         </tr>
                         <tr className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                  <span className="font-bold text-gray-800">输出参数 (Response)</span>
                               </div>
                            </td>
                            <td className="px-6 py-4 text-gray-500 font-mono text-xs">{selectedModel.output}</td>
                         </tr>
                         <tr className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 font-bold text-gray-800">使用形式</td>
                            <td className="px-6 py-4">
                               <span className="bg-orange-50 text-orange-600 px-2 py-1 rounded text-[10px] font-bold border border-orange-100">
                                  HTTP POST 请求
                               </span>
                            </td>
                         </tr>
                      </tbody>
                   </table>
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={14} /> 响应报文结构示例
                </h4>
                <div className="bg-slate-900 rounded-2xl p-6 text-sm font-mono text-gray-300 shadow-2xl relative group">
                  <div className="absolute right-4 top-4 text-gray-500 group-hover:text-blue-400 transition-colors cursor-pointer">
                    <ExternalLink size={14} />
                  </div>
                  <p className="text-green-500 mb-2">// Diagnostic Model Response Sample</p>
                  <p>{'{'}</p>
                  <p className="pl-4">"status": <span className="text-blue-400">"SUCCESS"</span>,</p>
                  <p className="pl-4">"model_id": <span className="text-blue-400">"{selectedModel.id}"</span>,</p>
                  <p className="pl-4">"diagnostic_result": {'{'}</p>
                  <p className="pl-8">"summary": <span className="text-yellow-200">"检测到潜在异常..."</span>,</p>
                  <p className="pl-8">"confidence": <span className="text-green-400">0.982</span>,</p>
                  <p className="pl-8">"trace_id": <span className="text-blue-400">"M-DIAG-{Math.random().toString(36).substr(2, 6).toUpperCase()}"</span></p>
                  <p className="pl-4">{'}'}</p>
                  <p>{'}'}</p>
                </div>
              </section>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 italic">
              请选择左侧模型查看详细技术细节
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MaaSView() {
  const [maasTab, setMaasTab] = useState<'timeseries' | 'specialized' | 'asset_maintenance'>('timeseries');

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="shrink-0 flex justify-between items-start">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">模型服务中心</h1>
           <p className="text-gray-500 mt-1 text-sm">提供垂直行业大模型、专家预测模型及设备诊断能力的统一托管与调用服务。</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
           <Zap size={14}/> 算力状态: <span className="text-green-600 font-bold">高</span>
        </div>
      </div>

      <div className="flex justify-between items-center shrink-0">
        <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
           <button 
             onClick={() => setMaasTab('timeseries')}
             className={cn("px-6 py-2 text-sm font-bold rounded-lg transition-all", maasTab === 'timeseries' ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-gray-500 hover:text-gray-800")}
           >
             浪潮时序大模型
           </button>
           <button 
             onClick={() => setMaasTab('specialized')}
             className={cn("px-6 py-2 text-sm font-bold rounded-lg transition-all", maasTab === 'specialized' ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-gray-500 hover:text-gray-800")}
           >
             专属 AI 模型
           </button>
           <button 
             onClick={() => setMaasTab('asset_maintenance')}
             className={cn("px-6 py-2 text-sm font-bold rounded-lg transition-all", maasTab === 'asset_maintenance' ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-gray-500 hover:text-gray-800")}
           >
             设备预测性维护
           </button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
         <AnimatePresence mode="wait">
            <motion.div
              key={maasTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {maasTab === 'timeseries' && <TimeSeriesWorkbench />}
              {maasTab === 'specialized' && <SpecializedAIWorkbench />}
              {maasTab === 'asset_maintenance' && <PredictiveMaintenanceWorkbench />}
            </motion.div>
         </AnimatePresence>
      </div>
    </div>
  );
}

function BusinessView() {
  const [activeCategory, setActiveCategory] = useState(CAPABILITY_CATEGORIES[0].id);
  const [selectedCapId, setSelectedCapId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCapabilities = BUSINESS_CAPABILITIES.filter(c => {
    const matchesCategory = c.category === activeCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.core.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const selectedCap = BUSINESS_CAPABILITIES.find(c => c.id === selectedCapId) || filteredCapabilities[0];

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="shrink-0 flex justify-between items-start">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">业务能力中心</h1>
           <p className="text-gray-500 mt-1 text-sm">提供能源互联网全场景原子化接口，支持标准化调用与 AI 增强分析能力。</p>
        </div>
        <div className="relative group w-72">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" size={16} />
           <input 
             type="text" 
             placeholder="搜索业务接口名称或核心逻辑..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 shadow-sm"
           />
        </div>
      </div>

      {/* Category Tabs (Top) */}
      <div className="shrink-0 flex gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
        {CAPABILITY_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedCapId(null);
            }}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeCategory === cat.id 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/50"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 flex gap-6">
        {/* Interface List & Detail */}
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm flex overflow-hidden">
           {/* List */}
           <div className="w-80 border-r border-gray-50 flex flex-col">
              <div className="p-4 border-b border-gray-50 bg-gray-50/10">
                 <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">接口清单 ({filteredCapabilities.length})</h4>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                 {filteredCapabilities.length > 0 ? filteredCapabilities.map(cap => (
                   <button
                     key={cap.id}
                     onClick={() => setSelectedCapId(cap.id)}
                     className={cn(
                       "w-full p-4 text-left border-b border-gray-50 transition-all group",
                       selectedCap?.id === cap.id ? "bg-blue-50/50" : "hover:bg-gray-50"
                     )}
                   >
                     <div className="flex justify-between items-start mb-1">
                        <span className={cn("px-1.5 py-0.5 rounded text-[9px] font-bold", cap.method === 'POST' ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600")}>
                           {cap.method}
                        </span>
                        <ChevronRight size={14} className={cn("transition-transform", selectedCap?.id === cap.id ? "text-blue-600 translate-x-1" : "text-gray-300")} />
                     </div>
                     <p className={cn("text-xs font-bold truncate", selectedCap?.id === cap.id ? "text-blue-700" : "text-gray-700")}>{cap.name}</p>
                     <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{cap.core}</p>
                   </button>
                 )) : (
                   <div className="p-8 text-center">
                     <p className="text-xs text-gray-400 italic">未找到匹配的接口</p>
                   </div>
                 )}
              </div>
           </div>

           {/* Detail Panel */}
           <div className="flex-1 flex flex-col min-w-0">
             {selectedCap ? (
                <div className="flex-1 flex flex-col h-full bg-white">
                   <div className="p-8 border-b border-gray-50 space-y-4 shrink-0">
                      <div className="flex justify-between items-start">
                         <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{selectedCap.name}</h2>
                         <button className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
                            <Library size={14}/> 申请调用权限
                         </button>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">{selectedCap.core}</p>
                   </div>

                   <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                      <div className="grid grid-cols-1 gap-8 max-w-3xl">
                         <section className="space-y-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                               <Info size={14} /> 接口特征
                            </h4>
                            <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm text-gray-600 leading-relaxed italic">
                               "{selectedCap.description}"
                            </div>
                         </section>

                         <section className="space-y-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                               <Container size={14} /> 参数定义
                            </h4>
                            <div className="overflow-hidden border border-gray-100 rounded-2xl">
                               <table className="w-full text-sm text-left">
                                  <thead className="bg-gray-50 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                                     <tr>
                                        <th className="px-6 py-3">节点</th>
                                        <th className="px-6 py-3">核心参数 / 描述</th>
                                     </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-50">
                                     <tr>
                                        <td className="px-6 py-4 font-bold text-gray-800">输入参数</td>
                                        <td className="px-6 py-4 text-gray-500 font-mono text-xs">{selectedCap.input}</td>
                                     </tr>
                                     <tr>
                                        <td className="px-6 py-4 font-bold text-gray-800">输出参数</td>
                                        <td className="px-6 py-4 text-gray-500 font-mono text-xs">{selectedCap.output}</td>
                                     </tr>
                                     <tr>
                                        <td className="px-6 py-4 font-bold text-gray-800">调用形式</td>
                                        <td className="px-6 py-4">
                                           <span className={cn("px-2 py-1 rounded text-[10px] font-bold", selectedCap.method === 'POST' ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600")}>
                                              HTTP {selectedCap.method} 请求
                                           </span>
                                        </td>
                                     </tr>
                                  </tbody>
                               </table>
                            </div>
                         </section>

                         <section className="space-y-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                               <Terminal size={14} /> 响应数据示例 (JSON)
                            </h4>
                            <div className="bg-slate-900 rounded-2xl p-6 text-cyan-50 font-mono text-xs leading-relaxed shadow-xl">
                               <p className="text-gray-500 mb-2">// Response 200 OK</p>
                               <p>{'{'}</p>
                               <p className="pl-4">"code": <span className="text-green-400">200</span>,</p>
                               <p className="pl-4">"msg": <span className="text-amber-300">"success"</span>,</p>
                               <p className="pl-4">"data": {'{'}</p>
                               <p className="pl-8">"traceId": <span className="text-amber-300">"REQ_8872_XJ_PROD"</span>,</p>
                               <p className="pl-8">"result": <span className="text-amber-300">"..."</span>,</p>
                               <p className="pl-8">"timestamp": {Date.now()}</p>
                               <p className="pl-4">{'}'}</p>
                               <p>{'}'}</p>
                            </div>
                         </section>
                      </div>
                   </div>
                </div>
             ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 italic">
                   请选择左侧接口查看详细定义说明
                </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}

function DataServiceView() {
  const [activeCategory, setActiveCategory] = useState(DATA_SERVICE_CATEGORIES[0].id);
  const [selectedCapId, setSelectedCapId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCapabilities = DATA_SERVICE_CAPABILITIES.filter(c => {
    const matchesCategory = c.category === activeCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.core.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const selectedCap = DATA_SERVICE_CAPABILITIES.find(c => c.id === selectedCapId) || filteredCapabilities[0];

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="shrink-0 flex justify-between items-start">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">数据服务中心</h1>
           <p className="text-gray-500 mt-1 text-sm">提供经过脱敏、清洗与标准化后的电力交易、气象预测及能源核心数据。</p>
        </div>
        <div className="relative group w-72">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" size={16} />
           <input 
             type="text" 
             placeholder="搜索数据接口名称或内容描述..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 shadow-sm"
           />
        </div>
      </div>

      {/* Category Tabs (Top) */}
      <div className="shrink-0 flex gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
        {DATA_SERVICE_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedCapId(null);
            }}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeCategory === cat.id 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/50"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 flex gap-6">
        {/* Interface List & Detail */}
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm flex overflow-hidden">
           {/* List */}
           <div className="w-80 border-r border-gray-50 flex flex-col">
              <div className="p-4 border-b border-gray-50 bg-gray-50/10">
                 <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">数据清单 ({filteredCapabilities.length})</h4>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                 {filteredCapabilities.length > 0 ? filteredCapabilities.map(cap => (
                   <button
                     key={cap.id}
                     onClick={() => setSelectedCapId(cap.id)}
                     className={cn(
                       "w-full p-4 text-left border-b border-gray-50 transition-all group",
                       selectedCap?.id === cap.id ? "bg-blue-50/50" : "hover:bg-gray-50"
                     )}
                   >
                     <div className="flex justify-between items-start mb-1">
                        <span className={cn("px-1.5 py-0.5 rounded text-[9px] font-bold", cap.method === 'POST' ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600")}>
                           {cap.method}
                        </span>
                        <ChevronRight size={14} className={cn("transition-transform", selectedCap?.id === cap.id ? "text-blue-600 translate-x-1" : "text-gray-300")} />
                     </div>
                     <p className={cn("text-xs font-bold truncate", selectedCap?.id === cap.id ? "text-blue-700" : "text-gray-700")}>{cap.name}</p>
                     <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{cap.core}</p>
                   </button>
                 )) : (
                   <div className="p-8 text-center">
                     <p className="text-xs text-gray-400 italic">未找到匹配的数据接口</p>
                   </div>
                 )}
              </div>
           </div>

           {/* Detail Panel */}
           <div className="flex-1 flex flex-col min-w-0">
             {selectedCap ? (
                <div className="flex-1 flex flex-col h-full bg-white">
                   <div className="p-8 border-b border-gray-50 space-y-4 shrink-0">
                      <div className="flex justify-between items-start">
                         <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{selectedCap.name}</h2>
                         <button className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
                            <Database size={14}/> 订阅数据产品
                         </button>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">{selectedCap.core}</p>
                   </div>

                   <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                      <div className="grid grid-cols-1 gap-8 max-w-3xl">
                         <section className="space-y-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                               <Info size={14} /> 适配原则
                            </h4>
                            <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm text-gray-600 leading-relaxed italic">
                               "{selectedCap.description}"
                            </div>
                         </section>

                         <section className="space-y-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                               <Container size={14} /> 数据契约定义
                            </h4>
                            <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm">
                               <table className="w-full text-sm text-left">
                                  <thead className="bg-gray-50 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                                     <tr>
                                        <th className="px-6 py-3">名称</th>
                                        <th className="px-6 py-3">参数明细</th>
                                     </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-50">
                                     <tr>
                                        <td className="px-6 py-4 font-bold text-gray-800">请求参数</td>
                                        <td className="px-6 py-4 text-gray-500 font-mono text-xs">{selectedCap.input}</td>
                                     </tr>
                                     <tr>
                                        <td className="px-6 py-4 font-bold text-gray-800">响应参数</td>
                                        <td className="px-6 py-4 text-gray-500 font-mono text-xs">{selectedCap.output}</td>
                                     </tr>
                                     <tr>
                                        <td className="px-6 py-4 font-bold text-gray-800">接口方法</td>
                                        <td className="px-6 py-4">
                                           <span className={cn("px-2 py-1 rounded text-[10px] font-bold", selectedCap.method === 'POST' ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600")}>
                                              Standard {selectedCap.method}
                                           </span>
                                        </td>
                                     </tr>
                                  </tbody>
                               </table>
                            </div>
                         </section>

                         <section className="space-y-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                               <Terminal size={14} /> 数据预览示例 (JSON)
                            </h4>
                            <div className="bg-slate-900 rounded-2xl p-6 text-cyan-50 font-mono text-xs leading-relaxed shadow-xl">
                               <p className="text-gray-500 mb-2">// Dataset Sample Output</p>
                               <p>{'{'}</p>
                               <p className="pl-4">"datasetId": <span className="text-amber-300">"DS_{selectedCap.id.toUpperCase()}"</span>,</p>
                               <p className="pl-4">"records": [</p>
                               <p className="pl-8">{'{'}</p>
                               <p className="pl-12">"timestamp": <span className="text-green-400">{Date.now()}</span>,</p>
                               <p className="pl-12">"fields": <span className="text-amber-300">"..."</span></p>
                               <p className="pl-8">{'}'}</p>
                               <p className="pl-4">],</p>
                               <p className="pl-4">"count": <span className="text-green-400">1</span></p>
                               <p>{'}'}</p>
                            </div>
                         </section>
                      </div>
                   </div>
                </div>
             ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 italic">
                   请选择左侧接口查看详细数据定义
                </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}

function ProcessEngineWorkbench() {
  const templates = [
    { id: 1, name: '电力交易合约审批流程', status: 'Running', nodes: 5, apps: 12 },
    { id: 2, name: '跨省交易合同签订流程', status: 'Active', nodes: 8, apps: 8 },
    { id: 3, name: '新能源运营测算审批', status: 'Draft', nodes: 4, apps: 0 },
    { id: 4, name: '碳配额履约管理流程', status: 'Running', nodes: 6, apps: 5 },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
           <h2 className="text-xl font-bold text-gray-900">BPMN 流程设计器</h2>
           <p className="text-sm text-gray-500 mt-1">可视化低代码流程建模，支持复杂分支逻辑与多角色权限校验。</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2 font-sans">
          <Upload size={16} /> 发布新版本
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
        {/* Templates List */}
        <div className="lg:col-span-1 border border-gray-100 rounded-3xl p-6 space-y-4 bg-gray-50/30 overflow-y-auto custom-scrollbar">
           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">行业标准流程模板</h3>
           {templates.map(t => (
             <div key={t.id} className="p-4 bg-white border border-gray-100 rounded-2xl hover:border-blue-300 transition-all cursor-pointer group shadow-sm">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-sm font-bold text-gray-800">{t.name}</span>
                   <span className={cn("text-[10px] px-2 py-0.5 rounded-full", t.status === 'Running' ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500")}>{t.status}</span>
                </div>
                <div className="flex gap-4 text-[10px] text-gray-400 font-medium">
                   <span className="flex items-center gap-1"><Cpu size={12}/> {t.nodes} 节点</span>
                   <span className="flex items-center gap-1"><Zap size={12}/> {t.apps} 应用关联</span>
                </div>
             </div>
           ))}
        </div>

        {/* Designer Preview */}
        <div className="lg:col-span-2 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center relative bg-gray-50/10 overflow-hidden group">
           <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
           <div className="relative flex flex-col items-center gap-4 text-center p-12">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                 <Cpu size={32}/>
              </div>
              <div>
                 <h4 className="font-bold text-gray-800">流程画布区域</h4>
                 <p className="text-sm text-gray-400 mt-1">支持拖拉拽、BPMN 2.0 标准组件开发<br/>请选择模板进入编辑模式</p>
              </div>
              <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="px-6 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all">
                    开始建模
                 </button>
                 <button className="px-6 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all">
                    导入 XML
                 </button>
              </div>
           </div>
           
           {/* Floating Toolbar */}
           <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 p-2 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50">
              {[Cpu, Zap, Container, User, ShieldCheck].map((Icon, i) => (
                <button key={i} className="p-3 bg-white hover:bg-blue-50 rounded-xl transition-all text-gray-400 hover:text-blue-600">
                   <Icon size={20}/>
                </button>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

function ReportEngineWorkbench() {
  const reports = [
    { name: '月度电力交易结算报表', type: 'Fin', icon: BarChart3 },
    { name: '区域新能源消纳分析', type: 'Env', icon: CloudLightning },
    { name: '设备健康度巡检年报', type: 'Ops', icon: Activity },
    { name: '现货市场价格波动趋势', type: 'Mkt', icon: TrendingUp },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
           <h2 className="text-xl font-bold text-gray-900 font-sans tracking-tight">智能报表引擎</h2>
           <p className="text-sm text-gray-500 mt-1">基于能源 Link 数据底座，快速构建专业化、合规的行业统计分析报表。</p>
        </div>
        <div className="flex gap-2 font-sans">
           <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2">
              <Upload size={16} /> 导出 Excel/PDF
           </button>
           <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2">
              <Plus size={16} /> 设计新报表
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 shrink-0 mb-8">
        {reports.map((r, i) => (
          <div key={i} className="bg-white border border-gray-100 p-5 rounded-2xl hover:border-blue-400 transition-all cursor-pointer group shadow-sm bg-gradient-to-br from-white to-gray-50/30">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform border border-blue-50">
                <r.icon size={20} />
              </div>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">{r.type}</span>
            </div>
            <h4 className="font-bold text-sm text-gray-800 leading-snug">{r.name}</h4>
          </div>
        ))}
      </div>

      {/* Report Preview Surface */}
      <div className="flex-1 border border-gray-100 rounded-[32px] bg-white shadow-inner p-8 overflow-hidden relative font-sans">
         <div className="flex justify-between items-center pb-6 border-b border-gray-50 mb-8">
            <h3 className="font-bold text-lg flex items-center gap-3">
               <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
               报表实时预览: 电力交易量利统计分析表 (月度)
            </h3>
            <div className="flex gap-4">
               {['日', '周', '月', '季', '年'].map((t, i) => (
                 <button key={i} className={cn("text-xs font-bold px-3 py-1.5 rounded-lg transition-all", t === '月' ? "bg-blue-50 text-blue-700" : "text-gray-400 hover:text-gray-600")}>
                    {t}
                 </button>
               ))}
            </div>
         </div>

         <div className="grid grid-cols-6 gap-4 animate-in fade-in duration-700">
            {/* Fake Table Header */}
            {['交易类型', '合同电量(MWh)', '结算均价(元)', '偏差率', '预测准确率', '状态管理'].map((h, i) => (
              <div key={i} className="text-[11px] font-bold text-gray-400 uppercase pb-4 border-b border-gray-50">
                 {h}
              </div>
            ))}
            
            {/* Fake Table Rows */}
            {[
              ['中长期合同', '1,245.8', '0.452', '+1.2%', '98.5%', 'Active'],
              ['日前竞价', '432.1', '0.512', '-0.5%', '92.1%', 'Final'],
              ['实时均衡', '128.4', '0.628', '+4.8%', '85.4%', 'Draft'],
              ['绿证交易', '55.0', '0.035', '--', '--', 'Locked'],
            ].map((row, i) => (
              <React.Fragment key={i}>
                {row.map((cell, ci) => (
                  <div key={ci} className={cn("py-5 text-sm font-medium border-b border-gray-50/50", ci === 0 ? "text-gray-900 font-bold" : "text-gray-500")}>
                    {ci === 5 ? (
                      <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", cell === 'Active' ? "bg-green-50 text-green-600" : cell === 'Draft' ? "bg-orange-50 text-orange-600" : "bg-gray-50 text-gray-400")}>
                        {cell}
                      </span>
                    ) : cell}
                  </div>
                ))}
              </React.Fragment>
            ))}
         </div>
         
         <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none h-40 bottom-0 top-auto"></div>
      </div>
    </div>
  );
}

function CommonServiceView() {
  const [activeCategory, setActiveCategory] = useState(COMMON_SERVICE_CATEGORIES[0].id);
  const [selectedCapId, setSelectedCapId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCapabilities = COMMON_SERVICE_CAPABILITIES.filter(c => {
    const matchesCategory = c.category === activeCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.core.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const selectedCap = COMMON_SERVICE_CAPABILITIES.find(c => c.id === selectedCapId) || filteredCapabilities[0];

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="shrink-0 flex justify-between items-start">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">通用服务中心</h1>
           <p className="text-gray-500 mt-1 text-sm">提供身份认证、运维支撑及行业通用工具能力，赋能快速应用开发。</p>
        </div>
        <div className="relative group w-72">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" size={16} />
           <input 
             type="text" 
             placeholder="搜索通用服务接口..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 shadow-sm"
           />
        </div>
      </div>

      {/* Category Tabs (Top) */}
      <div className="shrink-0 flex gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
        {COMMON_SERVICE_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedCapId(null);
            }}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeCategory === cat.id 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/50"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 flex gap-6">
        {/* Interface List & Detail */}
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm flex overflow-hidden">
           {/* List */}
           <div className="w-80 border-r border-gray-50 flex flex-col">
              <div className="p-4 border-b border-gray-50 bg-gray-50/10">
                 <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">服务清单 ({filteredCapabilities.length})</h4>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                 {filteredCapabilities.length > 0 ? filteredCapabilities.map(cap => (
                   <button
                     key={cap.id}
                     onClick={() => setSelectedCapId(cap.id)}
                     className={cn(
                       "w-full p-4 text-left border-b border-gray-50 transition-all group",
                       selectedCap?.id === cap.id ? "bg-blue-50/50" : "hover:bg-gray-50"
                     )}
                   >
                     <div className="flex justify-between items-start mb-1">
                        <span className={cn("px-1.5 py-0.5 rounded text-[9px] font-bold", cap.method === 'POST' ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600")}>
                           {cap.method}
                        </span>
                        <ChevronRight size={14} className={cn("transition-transform", selectedCap?.id === cap.id ? "text-blue-600 translate-x-1" : "text-gray-300")} />
                     </div>
                     <p className={cn("text-xs font-bold truncate", selectedCap?.id === cap.id ? "text-blue-700" : "text-gray-700")}>{cap.name}</p>
                     <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{cap.core}</p>
                   </button>
                 )) : (
                   <div className="p-8 text-center">
                     <p className="text-xs text-gray-400 italic">未找到匹配的服务接口</p>
                   </div>
                 )}
              </div>
           </div>

           {/* Detail Panel */}
           <div className="flex-1 flex flex-col min-w-0">
             {selectedCap ? (
                <div className="flex-1 flex flex-col h-full bg-white">
                   <div className="p-8 border-b border-gray-50 space-y-4 shrink-0">
                      <div className="flex justify-between items-start">
                         <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{selectedCap.name}</h2>
                         <button className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
                            <Box size={14}/> 申请接入服务
                         </button>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">{selectedCap.core}</p>
                   </div>

                   <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                      <div className="grid grid-cols-1 gap-8 max-w-3xl">
                         <section className="space-y-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                               <Info size={14} /> 技术特性
                            </h4>
                            <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm text-gray-600 leading-relaxed italic">
                               "{selectedCap.description}"
                            </div>
                         </section>

                         <section className="space-y-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                               <Container size={14} /> 接口定义
                            </h4>
                            <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm">
                               <table className="w-full text-sm text-left">
                                  <thead className="bg-gray-50 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                                     <tr>
                                        <th className="px-6 py-3">节点</th>
                                        <th className="px-6 py-3">参数明细</th>
                                     </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-50">
                                     <tr>
                                        <td className="px-6 py-4 font-bold text-gray-800">请求参数</td>
                                        <td className="px-6 py-4 text-gray-500 font-mono text-xs">{selectedCap.input}</td>
                                     </tr>
                                     <tr>
                                        <td className="px-6 py-4 font-bold text-gray-800">响应参数</td>
                                        <td className="px-6 py-4 text-gray-500 font-mono text-xs">{selectedCap.output}</td>
                                     </tr>
                                     <tr>
                                        <td className="px-6 py-4 font-bold text-gray-800">接口方法</td>
                                        <td className="px-6 py-4">
                                           <span className={cn("px-2 py-1 rounded text-[10px] font-bold", selectedCap.method === 'POST' ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600")}>
                                              Standard {selectedCap.method}
                                           </span>
                                        </td>
                                     </tr>
                                  </tbody>
                               </table>
                            </div>
                         </section>

                         <section className="space-y-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                               <Terminal size={14} /> 调用规范示例 (JSON)
                            </h4>
                            <div className="bg-slate-900 rounded-2xl p-6 text-cyan-50 font-mono text-xs leading-relaxed shadow-xl">
                               <p className="text-gray-500 mb-2">// Service Call Spec</p>
                               <p>{'{'}</p>
                               <p className="pl-4">"serviceCode": <span className="text-amber-300">"{selectedCap.id}"</span>,</p>
                               <p className="pl-4">"request": {'{'}</p>
                               <p className="pl-8">"traceId": <span className="text-amber-300">"REQ_{Date.now()}"</span>,</p>
                               <p className="pl-8">"payload": {'{ ... }'}</p>
                               <p className="pl-4">{'}'}</p>
                               <p>{'}'}</p>
                            </div>
                         </section>
                      </div>
                   </div>
                </div>
             ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 italic">
                   请选择左侧接口查看详细服务定义
                </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}

function EngineServiceView() {
  const [activeCategory, setActiveCategory] = useState(ENGINE_SERVICE_CATEGORIES[0].id);
  const [selectedCapId, setSelectedCapId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCapabilities = ENGINE_SERVICE_CAPABILITIES.filter(c => {
    const matchesCategory = c.category === activeCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.core.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const selectedCap = ENGINE_SERVICE_CAPABILITIES.find(c => c.id === selectedCapId) || filteredCapabilities[0];

  const renderWorkbench = () => {
    if (selectedCap?.id === 'engine-bpmn-1') return <ProcessEngineWorkbench />;
    if (selectedCap?.id === 'engine-report-1') return <ReportEngineWorkbench />;

    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 italic">
         请选择左侧服务引擎
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="shrink-0 flex justify-between items-start">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">引擎服务中心</h1>
           <p className="text-gray-500 mt-1 text-sm">提供专业化的流程引擎与报表引擎，助力构建复杂电力业务逻辑与专业分析看板。</p>
        </div>
        <div className="relative group w-72">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" size={16} />
           <input 
             type="text" 
             placeholder="搜索引擎组件..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 shadow-sm"
           />
        </div>
      </div>

      {/* Category Tabs (Top) */}
      <div className="shrink-0 flex gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
        {ENGINE_SERVICE_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedCapId(null);
            }}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeCategory === cat.id 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/50"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 flex gap-6">
        {/* Interface List & Detail */}
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm flex overflow-hidden">
           {/* List */}
           <div className="w-80 border-r border-gray-50 flex flex-col">
              <div className="p-4 border-b border-gray-50 bg-gray-50/10">
                 <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">组件清单 ({filteredCapabilities.length})</h4>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                 {filteredCapabilities.length > 0 ? filteredCapabilities.map(cap => (
                   <button
                     key={cap.id}
                     onClick={() => setSelectedCapId(cap.id)}
                     className={cn(
                       "w-full p-4 text-left border-b border-gray-50 transition-all group",
                       selectedCap?.id === cap.id ? "bg-blue-50/50" : "hover:bg-gray-50"
                     )}
                   >
                     <div className="flex justify-between items-start mb-1">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-50 text-blue-600">
                           CORE
                        </span>
                        <ChevronRight size={14} className={cn("transition-transform", selectedCap?.id === cap.id ? "text-blue-600 translate-x-1" : "text-gray-300")} />
                     </div>
                     <p className={cn("text-xs font-bold truncate", selectedCap?.id === cap.id ? "text-blue-700" : "text-gray-700")}>{cap.name}</p>
                     <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{cap.core}</p>
                   </button>
                 )) : (
                   <div className="p-8 text-center">
                     <p className="text-xs text-gray-400 italic">未找到匹配的引擎组件</p>
                   </div>
                 )}
              </div>
           </div>

           {/* Detail Panel */}
           <div className="flex-1 flex flex-col min-w-0">
             {renderWorkbench()}
           </div>
        </div>
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
       <div className="text-center pb-8 border-b border-gray-100">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
             <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold">系统管理与安全配置</h1>
          <p className="text-gray-500 text-sm mt-2">管理平台权限、API凭证、审计日志及全局配置中心。</p>
       </div>

       <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-800">API 访问凭证</h3>
              <div className="space-y-3">
                 <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center">
                    <div className="font-mono text-xs text-gray-500">EN_API_KEY_8872_XJ_PROD</div>
                    <button className="text-blue-600 text-xs font-bold hover:underline">复制 KEY</button>
                 </div>
                 <button className="text-blue-600 text-xs font-medium">+ 创建新凭证</button>
              </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="font-bold text-gray-800 mb-4">系统服务状态</h3>
             <div className="divide-y divide-gray-50">
                {[
                  { name: "流程引擎 (BPMN v2.0)", status: "Running" },
                  { name: "消息路由网关", status: "Running" },
                  { name: "认证中心 (OAuth2.0)", status: "Active" }
                ].map((item, idx) => (
                  <div key={idx} className="py-4 flex justify-between items-center font-medium text-sm">
                    <span className="text-gray-700">{item.name}</span>
                    <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-[10px]">{item.status}</span>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}

// --- Main Layout ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'maas' | 'business' | 'data' | 'common' | 'engine' | 'settings'>('dashboard');

  const navigation = [
    { id: 'dashboard', label: '运行监控', icon: LayoutDashboard },
    { id: 'maas', label: '模型服务', icon: BrainCircuit },
    { id: 'business', label: '业务能力', icon: Briefcase },
    { id: 'data', label: '数据服务', icon: Database },
    { id: 'common', label: '通用服务', icon: Box },
    { id: 'engine', label: '引擎服务', icon: Zap },
    { id: 'settings', label: '系统管理', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FB] font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col z-20">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Zap className="text-white fill-white" size={20} />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-gray-800">EnergyLink</h1>
          </div>
          <p className="text-[10px] font-bold text-gray-400 mt-2 tracking-widest uppercase px-1">智能能源业务中台</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-blue-50 text-blue-700 font-bold" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon size={18} className={cn(isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600")} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
              <User size={16} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate text-gray-800">Energy_Dev_01</p>
              <p className="text-[10px] text-gray-500">PaaS Enterprise</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">{navigation.find(n => n.id === activeTab)?.label}</span>
              <div className="h-4 w-[1px] bg-gray-200" />
              <span className="text-xs text-gray-400">Last update: {new Date().toLocaleTimeString()}</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                  <Activity size={14} className="text-green-500" /> System Online
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600"><Bell size={20}/></button>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
           <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.15 }}
                className="h-full"
              >
                {activeTab === 'dashboard' && <DashboardView />}
                {activeTab === 'maas' && <MaaSView />}
                {activeTab === 'business' && <BusinessView />}
                {activeTab === 'data' && <DataServiceView />}
                {activeTab === 'common' && <CommonServiceView />}
                {activeTab === 'engine' && <EngineServiceView />}
                {activeTab === 'settings' && <SettingsView />}
              </motion.div>
           </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
