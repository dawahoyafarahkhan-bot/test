/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ApiAsset {
  id: string;
  category: 'model' | 'business' | 'data' | 'general';
  subCategory?: string;
  name: string;
  description: string;
  status: 'active' | 'beta' | 'deprecated';
  version: string;
  endpoint: string;
  type?: 'timeseries' | 'spot_price' | 'asset_maintenance';
  input?: string;
  output?: string;
  core?: string;
}

export const PROVINCES = ['山东', '山西', '广东', '甘肃', '浙江', '江苏'];
export const NODES: Record<string, string[]> = {
  '山东': ['济南枢纽', '青岛负荷中心', '烟台风电汇集站', '鲁西换流站'],
  '广东': ['广州南沙', '深圳龙岗', '佛山顺德', '珠海香洲'],
  '山西': ['太原北', '大同同电', '临汾尧都', '朔州平鲁'],
};

export const API_ASSETS: ApiAsset[] = [
  // Model Services - Time Series
  { id: 'm-ts-1', category: 'model', type: 'timeseries', subCategory: '时序大模型', name: 'Kaiwu-TSM-LoadV0.1', description: '高精度时序负荷预测基座模型，支持多周期微调。', status: 'active', version: 'v0.1.0', endpoint: '/api/v1/models/ts/load' },
  { id: 'm-ts-2', category: 'model', type: 'timeseries', subCategory: '时序大模型', name: 'Kaiwu-TSM-SolarV0.1', description: '光伏功率时序预测模型，深度整合气象特征参数。', status: 'active', version: 'v1.0.2', endpoint: '/api/v1/models/ts/solar' },
  
  // Model Services - Specialized AI (Spot Price)
  { id: 'm-sp-1', category: 'model', type: 'spot_price', subCategory: '专属AI模型', name: '统一结算点日前现货价格预测', description: '预测未来24小时省内统一结算点日前现货市场电价。', status: 'active', version: 'v2.1', endpoint: '/api/v1/models/sp/unified-da' },
  { id: 'm-sp-2', category: 'model', type: 'spot_price', subCategory: '专属AI模型', name: '统一结算点实时现货价格预测', description: '秒级刷新，预测未来1-4小时统一结算点实时市场价格。', status: 'active', version: 'v2.0', endpoint: '/api/v1/models/sp/unified-rt' },
  { id: 'm-sp-3', category: 'model', type: 'spot_price', subCategory: '专属AI模型', name: '节点实时现货电价预测', description: '基于地理节点位置，预测电力物理节点的实时现货价格。', status: 'active', version: 'v1.5', endpoint: '/api/v1/models/sp/node-rt' },

  // Model Services - Asset Maintenance (New)
  { 
    id: 'm-am-1', 
    category: 'model', 
    type: 'asset_maintenance', 
    subCategory: '设备预测性维护', 
    name: '设备故障AI诊断接口', 
    description: '可复用、原子化，适配多类型能源设备参数', 
    status: 'active', 
    version: 'v1.0', 
    endpoint: '/api/v1/models/maintenance/fault-diag',
    core: '基于设备运行数据，AI识别设备故障类型、位置及原因，支撑快速运维',
    input: '设备运行数据、设备类型、故障特征（必填）',
    output: '故障类型、故障位置、原因分析、处理建议'
  },
  { 
    id: 'm-am-2', 
    category: 'model', 
    type: 'asset_maintenance', 
    subCategory: '设备预测性维护', 
    name: '能耗异常AI诊断接口', 
    description: '可复用、无状态，支持自定义异常阈值参数', 
    status: 'active', 
    version: 'v1.0', 
    endpoint: '/api/v1/models/maintenance/energy-noise',
    core: 'AI识别用户用能异常，分析异常原因，支撑节能优化',
    input: '用能数据、异常阈值、分析时段（必填）',
    output: '异常点、异常类型、原因分析、优化建议'
  },
  { 
    id: 'm-am-3', 
    category: 'model', 
    type: 'asset_maintenance', 
    subCategory: '设备预测性维护', 
    name: '能效异常AI诊断接口', 
    description: '可复用、可配置化，支持按能效标准参数切换', 
    status: 'active', 
    version: 'v1.2', 
    endpoint: '/api/v1/models/maintenance/eff-anomaly',
    core: 'AI诊断组织或设备能效异常，识别低效环节，支撑能效提升',
    input: '能效数据、能效标准、分析对象（必填）',
    output: '异常环节、低效原因、能效提升方案'
  },
];

export interface BusinessCapability {
  id: string;
  name: string;
  category: string;
  description: string;
  method: 'GET' | 'POST';
  input: string;
  output: string;
  core: string;
}

export const CAPABILITY_CATEGORIES = [
  { id: 'efficiency', name: '能耗与能效管理', description: '聚焦能源消耗核算与效费优化分析' },
  { id: 'cost', name: '能源成本与交易管理', description: '覆盖电价模型、模拟核算与交易决策' },
  { id: 'asset', name: '设备与资产管理', description: '设备健康分析、预警与全生命周期管理' },
  { id: 'compliance', name: '合规与数据规范', description: '行业标准查询、合规校验与标准化编码' },
];

export const DATA_SERVICE_CATEGORIES = [
  { id: 'basic', name: '基础数据产品', description: '聚焦电力交易核心数据及能源基础数据' },
  { id: 'value', name: '增值数据产品', description: '对基础数据深度加工形成的进阶数据产品' },
  { id: 'management', name: '数据管理接口', description: '涵盖数据源、存储、备份及恢复管理' },
];

export const DATA_SERVICE_CAPABILITIES: BusinessCapability[] = [
  // 1. 数据管理接口
  {
    id: 'data-mgmt-1',
    category: 'management',
    name: '数据源管理接口',
    core: '新增、修改、删除数据源信息（含电力交易、气象、政策文件等数据源），管理数据接入源头，支撑数据产品加工',
    method: 'POST',
    input: '数据源信息、操作类型（新增/修改/删除）（必填）',
    output: '操作结果、数据源ID、操作时间',
    description: '可复用、可配置化，支持按数据源类型参数适配'
  },
  {
    id: 'data-mgmt-2',
    category: 'management',
    name: '数据存储策略配置接口',
    core: '配置数据存储策略（如存储周期、存储格式），保障数据及数据产品存储合理、安全',
    method: 'POST',
    input: '数据类型、存储策略参数、存储周期（必填）',
    output: '配置结果、存储策略明细、生效时间',
    description: '可复用、可配置化，支持按数据类型参数切换存储策略'
  },
  {
    id: 'data-mgmt-3',
    category: 'management',
    name: '数据备份接口',
    core: '对平台存储的能源数据、数据产品及政策文件数据进行备份，防止数据丢失',
    method: 'POST',
    input: '备份范围、备份方式、备份存储地址（必填）',
    output: '备份结果、备份数据量、备份时间',
    description: '可复用、无状态，支持按备份范围、备份方式参数切换'
  },
  {
    id: 'data-mgmt-4',
    category: 'management',
    name: '数据恢复接口',
    core: '从备份数据中恢复丢失或异常的数据及数据产品，保障数据完整性',
    method: 'POST',
    input: '恢复范围、备份版本、恢复目标地址（必填）',
    output: '恢复结果、恢复数据量、恢复时间',
    description: '可复用、无状态，支持按恢复范围、备份版本参数切换'
  },
  {
    id: 'data-mgmt-5',
    category: 'management',
    name: '自定义数据加工规则接口',
    core: '支持开发者自定义数据加工规则，对基础数据进行个性化处理，满足定制化数据产品需求',
    method: 'POST',
    input: '数据类型、加工规则、加工目标（必填）',
    output: '加工结果、加工规则、生效状态',
    description: '可复用、可配置化，支持按数据类型、加工需求参数适配'
  },

  // 2. 基础数据产品接口
  {
    id: 'data-basic-1',
    category: 'basic',
    name: '市场运行数据接口',
    core: '交易电量数据、直调负荷(MW)、新能源负荷(MW)竞价空间(MW)、联络线计划(MW)、正负备用、必开必修检修容量等',
    method: 'GET',
    input: '查询维度（年度/区域）、指标类型、时间范围（必填）',
    output: '市场运行指标列表、时间序列数据、单位信息',
    description: '可复用、可配置化，支持按查询维度、时间范围参数切换'
  },
  {
    id: 'data-basic-2',
    category: 'basic',
    name: '现货价格数据接口',
    core: '提供日前、实时现货电价数据，支持省内统一结算点及各物理节点',
    method: 'GET',
    input: '价格类型（日前/实时）、节点/区域、时间范围（必填）',
    output: '电价列表、时间戳、区域标识',
    description: '可复用，支持按价格类型、节点ID参数切换'
  },
  {
    id: 'data-basic-3',
    category: 'basic',
    name: '中长期价格数据接口',
    core: '提供月度、年度中长期交易成交电价数据，支撑长周期成本分析',
    method: 'GET',
    input: '交易周期（月/年）、合约类型、省份（必填）',
    output: '成交均价、成交电量、环比变化',
    description: '可配置化，支持按交易周期、合约类型筛选'
  },
  {
    id: 'data-basic-4',
    category: 'basic',
    name: '交易规则数据接口',
    core: '数字化电力交易细则，提供各省份交易规则条文与参数查询',
    method: 'GET',
    input: '市场名称、规则分类、版本号（可选）',
    output: '规则条文、参数阈值、生效日期',
    description: '无状态，支持版本号回放与对比'
  },
  {
    id: 'data-basic-5',
    category: 'basic',
    name: '交易主体数据接口',
    core: '提供发电企业、售电公司、大用户基本信息及信用评价数据',
    method: 'GET',
    input: '主体名称/ID、主体类型（可选）',
    output: '企业概况、准入状态、信用评分',
    description: '可复用，支持按主体类型参数过滤'
  },
  {
    id: 'data-basic-6',
    category: 'basic',
    name: '未来7天气象数据产品接口',
    core: '提供标准化气象数据产品，含按区域、经纬度划分的气象预测数据，支撑能源调度、负荷预测等场景',
    method: 'GET',
    input: '区域/经纬度、预测时段、气象指标（必填）',
    output: '气象数据产品、预测精度、数据时段',
    description: '可复用、无状态，支持按区域、经纬度、时间参数筛选'
  },
  {
    id: 'data-basic-7',
    category: 'basic',
    name: '未来45天气象数据产品接口',
    core: '提供长周期、高精度气象趋势预估，支撑中长期负荷与发电计划制定',
    method: 'GET',
    input: '区域、预测时段、预测细分度（可选）',
    output: '长期气候趋势、概率分布、历史对比',
    description: '无状态，支持按预测颗粒度、时间跨度筛选'
  },
  {
    id: 'data-basic-8',
    category: 'basic',
    name: '政策标准文件数据接口',
    core: '提供标准化政策、标准文件数据产品，含文件原文、解读、生效时间等信息，支持查询与导出',
    method: 'GET',
    input: '省份、生效时间范围、关键词（可选）',
    output: '政策标准文件数据、文件明细、查询结果',
    description: '可复用、无状态，支持按文件类型、生效时间参数查询'
  },
  {
    id: 'data-basic-9',
    category: 'basic',
    name: '基础数据产品导出接口',
    core: '支持将各类基础数据产品导出为标准化格式，方便开发者离线使用',
    method: 'POST',
    input: '数据产品类型、导出格式、查询条件（必填）',
    output: '导出结果、下载地址、导出时间',
    description: '可复用、可配置化，支持按数据产品类型、导出格式参数切换'
  },

  // 3. 增值数据产品接口
  {
    id: 'data-value-1',
    category: 'value',
    name: '电力交易行情分析数据接口',
    core: '提供电力交易行情分析增值产品，含行情趋势、价格预测、市场分析等，支撑交易决策',
    method: 'GET',
    input: '分析维度、时间范围、交易类型（必填）',
    output: '行情分析数据、趋势图表、分析结论',
    description: '可复用、可配置化，支持按分析维度、时间范围参数切换'
  },
  {
    id: 'data-value-2',
    category: 'value',
    name: '碳减排潜力分析数据接口',
    core: '提供碳减排潜力分析增值产品，含减排空间、优化方案、效果预估等数据',
    method: 'GET',
    input: '区域、行业类型、基准数据（必填）',
    output: '碳减排分析数据、减排潜力值、优化建议',
    description: '可复用、无状态，支持按区域、行业类型参数筛选'
  },
  {
    id: 'data-value-3',
    category: 'value',
    name: '资产健康度数据接口',
    core: '提供能源资产健康度分析增值产品，含资产运行状态、故障预警、寿命预估等数据',
    method: 'GET',
    input: '资产ID、资产类型、评估维度（必填）',
    output: '资产健康度数据、预警信息、评估报告',
    description: '可复用、可配置化，支持按资产类型、评估维度参数切换'
  },
];

export const BUSINESS_CAPABILITIES: BusinessCapability[] = [
  // 1. 能耗与能效管理域
  {
    id: 'eff-1',
    category: 'efficiency',
    name: '能耗折算系数查询',
    core: '查询各类能源的折算系数，为能耗核算提供基础数据支撑',
    method: 'GET',
    input: '能源类型（必填）、查询时间（可选）',
    output: '能源类型、折算系数、数据更新时间',
    description: '可复用、无状态，支持按能源类型参数查询。'
  },
  {
    id: 'eff-2',
    category: 'efficiency',
    name: '能耗核算规则计算',
    core: '按照预设规则或可配置规则，完成多维度能耗核算',
    method: 'POST',
    input: '核算规则、组织/设备ID、时间范围',
    output: '核算结果、核算规则、核算时间',
    description: '支持按组织/设备/时间维度参数切换。'
  },
  {
    id: 'eff-3',
    category: 'efficiency',
    name: '多维度能耗建模接口',
    core: '基于输入参数，构建多维度能耗模型，支撑能耗分析',
    method: 'POST',
    input: '能耗数据、建模维度、时间范围（必填）',
    output: '能耗模型参数、建模结果、模型精度',
    description: '原子化、无状态，输入输出标准化。'
  },
  {
    id: 'eff-4',
    category: 'efficiency',
    name: '国标/行标基准模型查询',
    core: '查询能效相关的国标、行标基准模型，为对标提供依据',
    method: 'GET',
    input: '标准类型（国标/行标）、行业类型（必填）',
    output: '基准模型参数、标准编号、标准名称',
    description: '可复用、可配置化，支持标准类型切换。'
  },
  {
    id: 'eff-5',
    category: 'efficiency',
    name: '能效测算规则校验',
    core: '校验能效测算规则的合规性、合理性，贴合行业标准',
    method: 'POST',
    input: '测算规则、校验标准、行业类型（必填）',
    output: '校验结果、不合规项、整改建议',
    description: '原子化、无状态，支持按标准参数切换校验规则。'
  },
  {
    id: 'eff-6',
    category: 'efficiency',
    name: '组织能效建模接口',
    core: '针对特定组织，构建能效模型，支撑组织能效评估',
    method: 'POST',
    input: '组织ID、组织用能数据、建模周期',
    output: '组织能效模型、模型指标、评估等级',
    description: '支持按组织参数灵活适配。'
  },
  {
    id: 'eff-7',
    category: 'efficiency',
    name: '用能特征分析接口',
    core: '分析用户用能特征，识别用能规律与异常',
    method: 'POST',
    input: '用户ID、用能数据、分析维度',
    output: '用能特征报告、异常点、规律总结',
    description: '可复用、原子化，支持自定义分析维度参数。'
  },
  {
    id: 'eff-8',
    category: 'efficiency',
    name: '用能质量评估接口',
    core: '对用户用能质量进行标准化评估，输出评估结果',
    method: 'POST',
    input: '用户用能数据、评估标准',
    output: '评估分数、评估等级、优化建议',
    description: '可复用、无状态，输入输出标准化。'
  },
  {
    id: 'eff-9',
    category: 'efficiency',
    name: '能流分析接口',
    core: '分析能源流动路径、损耗情况，支撑用能优化',
    method: 'POST',
    input: '能源节点数据、能流路径参数',
    output: '能流路径、损耗数据、优化方案',
    description: '原子化、可复用，适配多场景能流分析需求。'
  },

  // 2. 能源成本与交易管理域
  {
    id: 'cost-1',
    category: 'cost',
    name: '电价模型计算接口',
    core: '基于输入参数，完成电价测算，支撑电费评估',
    method: 'POST',
    input: '电价规则、用电数据、时间范围',
    output: '测算电价、计算依据、总电费预估',
    description: '支持不同电价规则参数切换。'
  },
  {
    id: 'cost-2',
    category: 'cost',
    name: '电费套餐模拟接口',
    core: '模拟不同电费套餐的成本，为客户提供选择依据',
    method: 'GET',
    input: '套餐类型、用电负荷、时间范围',
    output: '各套餐成本、性价比分析、推荐方案',
    description: '支持套餐类型参数切换。'
  },
  {
    id: 'cost-3',
    category: 'cost',
    name: '电费核算接口',
    core: '按照预设规则，完成电费精准核算',
    method: 'POST',
    input: '用电明细、电价标准、核算规则',
    output: '电费明细、总金额、核算依据',
    description: '输入输出标准化，支撑精准核算。'
  },
  {
    id: 'cost-4',
    category: 'cost',
    name: '策略效果评价接口',
    core: '对电力交易策略的效果进行评价，输出评价结果',
    method: 'POST',
    input: '交易策略、交易数据、评价维度',
    output: '评价分数、效果分析、优化建议',
    description: '支持不同评价维度参数切换。'
  },
  {
    id: 'cost-5',
    category: 'cost',
    name: '结算分析接口',
    core: '对电力交易结算数据进行分析，支撑结算管理',
    method: 'POST',
    input: '结算数据、交易场次、时间范围',
    output: '结算分析报告、盈亏数据、异常提示',
    description: '适配多类型交易结算场景。'
  },
  {
    id: 'cost-6',
    category: 'cost',
    name: '清分核算接口',
    core: '完成电力交易相关费用的清分与核算，输出明细',
    method: 'POST',
    input: '交易费用总额、参与主体、清分规则',
    output: '清分明细、各主体费用、核算依据',
    description: '原子化、支持输入输出标准化。'
  },
  {
    id: 'cost-7',
    category: 'cost',
    name: '市场披露数据查询',
    core: '查询电力市场披露的各类公开数据，支撑交易决策',
    method: 'GET',
    input: '数据类型、时间范围、区域（可选）',
    output: '披露数据明细、发布时间、数据来源',
    description: '支持按数据类型、时间维度参数查询。'
  },
  {
    id: 'cost-8',
    category: 'cost',
    name: '交易出清数据同步',
    core: '同步电力交易出清数据，保障数据实时性',
    method: 'POST',
    input: '交易场次ID、同步时间',
    output: '出清数据、同步结果、数据更新时间',
    description: '支持按交易场次参数同步。'
  },
  {
    id: 'cost-9',
    category: 'cost',
    name: '政策数据接口',
    core: '查询能源行业相关政策、规则数据，支撑合规运营',
    method: 'GET',
    input: '政策类型、区域、发布时间范围（可选）',
    output: '政策文件、政策要点、发布单位',
    description: '支持按政策类型、区域参数查询。'
  },

  // 3. 设备与资产管理域
  {
    id: 'asset-1',
    category: 'asset',
    name: '设备告警规则校验',
    core: '校验设备告警规则的合理性、合规性，支撑设备监控',
    method: 'POST',
    input: '告警规则、设备类型、阈值参数',
    output: '校验结果、不合理项、调整建议',
    description: '支持自定义告警阈值参数。'
  },
  {
    id: 'asset-2',
    category: 'asset',
    name: '隐患预警计算接口',
    core: '基于设备运行数据，计算设备隐患预警，提前防范故障',
    method: 'POST',
    input: '设备运行数据、预警阈值、设备ID',
    output: '预警等级、隐患点、处理建议',
    description: '利用 AI 算法在输入输出标准化上实现原子化。'
  },
  {
    id: 'asset-3',
    category: 'asset',
    name: '设备性能评估接口',
    core: '对设备运行性能进行评估，输出评估结果与优化建议',
    method: 'POST',
    input: '设备运行数据、设备类型、评估周期',
    output: '评估结果、性能指标、优化建议',
    description: '支持不同设备类型参数适配。'
  },
  {
    id: 'asset-4',
    category: 'asset',
    name: '设备全生命周期管理',
    core: '管理设备从安装、运行到报废的全命周期数据',
    method: 'POST',
    input: '设备ID、生命周期阶段、相关数据',
    output: '生命周期明细、状态评估、维护计划',
    description: '适配多类型设备管理场景。'
  },
  {
    id: 'asset-5',
    category: 'asset',
    name: '备品备件库存查询',
    core: '查询备品备件的库存情况，支撑设备运维',
    method: 'GET',
    input: '备件类型、库存区域、备件ID（可选）',
    output: '库存数量、库存位置、备件状态',
    description: '支持按备件类型、库存区域参数查询指标。'
  },
  {
    id: 'asset-6',
    category: 'asset',
    name: '资产价值评估接口',
    core: '对能源资产进行价值评估，输出评估结果',
    method: 'POST',
    input: '资产ID、评估标准、资产参数',
    output: '评估价值、评估依据、资产状态',
    description: '支持支持不同评估标准参数切换。'
  },
  {
    id: 'asset-7',
    category: 'asset',
    name: '发电效率指标计算',
    core: '计算新能源电站的发电效率指标，支撑运营评估',
    method: 'POST',
    input: '电站类型、发电数据、时间范围',
    output: '发电效率指标、计算结果、对比分析',
    description: '适配光伏、风电等站端。'
  },
  {
    id: 'asset-8',
    category: 'asset',
    name: '经济收益评估接口',
    core: '评估新能源电站的经济收益，支撑投资决策',
    method: 'POST',
    input: '电站参数、发电数据、收益规则',
    output: '收益评估结果、明细、投资回报周期',
    description: '支持不同收益测算规则参数切换。'
  },
  {
    id: 'asset-9',
    category: 'asset',
    name: '设备健康状态分析',
    core: '分析设备健康状态，识别异常，支撑运维优化',
    method: 'POST',
    input: '设备运行数据、设备ID、分析周期',
    output: '健康状态等级、异常分析、维护建议',
    description: '输入输出标准化技术分析。'
  },
  {
    id: 'asset-10',
    category: 'asset',
    name: '空调/空压机/照明调控',
    core: '提供节能设备的调控策略，支撑场景化节能控制',
    method: 'POST',
    input: '设备类型、运行环境数据、节能目标',
    output: '调控策略、节能效果预估、参数设置',
    description: '支持支持不同设备类型参数适配。'
  },

  // 4. 合规与数据规范域
  {
    id: 'comp-1',
    category: 'compliance',
    name: '法规/标准查询接口',
    core: '查询能源行业相关法规、标准文件，支撑合规运营',
    method: 'GET',
    input: '法规类型、区域、关键词',
    output: '法规/标准原文、发布信息、核心要点',
    description: '支持按法规类型、区域参数查询。'
  },
  {
    id: 'comp-2',
    category: 'compliance',
    name: '合规检测规则校验',
    core: '校验业务流程、数据的合规性，输出校验结果',
    method: 'POST',
    input: '业务流程/数据、合规场景、标准',
    output: '合规校验结果、不合规项、整改建议',
    description: '可自定义合规场景参数适配。'
  },
  {
    id: 'comp-3',
    category: 'compliance',
    name: '基础信息编码接口',
    core: '提供能源行业基础信息的标准化编码，支撑数据统一',
    method: 'GET',
    input: '信息类型、关键词（可选）',
    output: '标准化编码、对应信息、编码说明',
    description: '可复用、无状态，输入输出标准化。'
  },
  {
    id: 'comp-4',
    category: 'compliance',
    name: '数据采集来源编码',
    core: '对数据采集来源进行标准化编码，解决数据孤岛问题',
    method: 'GET',
    input: '采集来源类型、来源名称（可选）',
    output: '采集来源编码、来源详情、编码规则',
    description: '适配多类型采集来源。'
  },
  {
    id: 'comp-5',
    category: 'compliance',
    name: '采集数据编码接口',
    core: '对采集的能源数据进行标准化编码，保障数据一致性',
    method: 'POST',
    input: '采集数据、数据类型',
    output: '标准化编码、编码后数据、校验结果',
    description: '可复用、无状态，输入输出标准化。'
  }
];

export const COMMON_SERVICE_CATEGORIES = [
  { id: 'identity', name: '身份与权限管理', description: '提供用户组织、角色管理及精细化权限分配能力' },
  { id: 'ops', name: '运行支撑服务', description: '包括日志审计、系统监控、消息推送及通用工具' },
];

export const ENGINE_SERVICE_CATEGORIES = [
  { id: 'bpmn', name: '流程引擎', description: '遵循BPMN规范，提供可视化建模、监控与迭代能力' },
  { id: 'report', name: '报表引擎', description: '标准化报表设计、生成与导出，满足合规上报需求' },
];

export const COMMON_SERVICE_CAPABILITIES: BusinessCapability[] = [
  // 1. 身份与权限管理
  {
    id: 'common-auth-user',
    category: 'identity',
    name: '用户管理接口',
    core: '提供用户的增删改查、组织架构归属设置及状态维护，支持开发者对接平台统一用户体系。',
    method: 'POST',
    input: '账号信息、基本资料、组织ID、操作类型（CRUD）（必填）',
    output: '操作状态、用户唯一标识符 (UID)、同步结果',
    description: '支持多租户隔离，适配能源行业多层级组织架构。'
  },
  {
    id: 'common-auth-role',
    category: 'identity',
    name: '角色管理接口',
    core: '定义与维护业务角色（如调度员、交易员、审核员），支持角色的分级授权与继承关系配置。',
    method: 'POST',
    input: '角色名称、角色编码、功能描述、归属应用标识（必填）',
    output: '角色ID、状态详情、生效范围',
    description: '标准 RBAC 模型设计，支持原子化角色定义。'
  },
  {
    id: 'common-auth-assign',
    category: 'identity',
    name: '权限分配接口',
    core: '建立用户与角色的关联关系，或直接授予特定资源（如报表、模型、物理设备）的访问权限。',
    method: 'POST',
    input: '用户UID、角色ID列表、特定资源权限包、失效时间（可选）（必填）',
    output: '授权状态、鉴权缓存状态、操作流水号',
    description: '支持细粒度权限管控，集成 JWT/OAuth2.0 鉴权协议。'
  },
  // 2. 运行支撑服务
  {
    id: 'common-ops-1',
    category: 'ops',
    name: '日志与监控服务接口',
    core: '提供API接口调用日志、应用运行日志、异常告警等能力，支持开发者监控应用运行状态，快速定位与排查问题。',
    method: 'GET',
    input: '应用标识、查询时段、日志类型、过滤条件（必填）',
    output: '日志列表、运行状态摘要、异常统计告警信息',
    description: '高并发异步设计，支持秒级告警触发。'
  },
  {
    id: 'common-ops-2',
    category: 'ops',
    name: '消息通知服务接口',
    core: '提供短信、邮件、系统消息等多渠道通知能力，支持开发者在应用中集成消息通知功能，实现业务事件的及时推送。',
    method: 'POST',
    input: '通知载体（短信/邮件/站内信）、接收者列表、消息内容、模版变量（必填）',
    output: '推送状态、消息序列号、预计送达统计',
    description: '支持多渠道模版配置，具备高可靠重试机制。'
  },
  {
    id: 'common-ops-3',
    category: 'ops',
    name: '通用工具服务接口',
    core: '提供数据格式转换、加密解密、时间同步等通用工具能力，支撑开发者解决二次开发过程中的常见技术问题。',
    method: 'POST',
    input: '待处理数据、操作算法（AES/BASE64/SYNC等）、公共参数（必填）',
    output: '处理后结果串、校验码',
    description: '内置行业标准加密算法，高响应性能。'
  },
];

export const ENGINE_SERVICE_CAPABILITIES: BusinessCapability[] = [
  {
    id: 'engine-bpmn-1',
    category: 'bpmn',
    name: '流程引擎服务中心',
    core: '遵循BPMN规范，提供可视化流程设计、执行、监控、迭代全生命周期管理能力。适配电力交易审批、合同签订、设备运维等流程。',
    method: 'POST',
    input: '流程模版ID、业务单据数据、流程变量、处理人（必填）',
    output: '流程实例状态、流转轨迹、执行结果',
    description: '微服务架构设计，支持拖拽式建模，与业务、数据模块无缝集成。'
  },
  {
    id: 'engine-report-1',
    category: 'report',
    name: '报表引擎服务中心',
    core: '提供标准化报表设计、生成能力。适配能耗报表、资产分析报告。支持数据钻取、日/月自动生成。',
    method: 'POST',
    input: '报表模板名称、数据源配置、统计周期、导出格式（必填）',
    output: '可视化渲染数据、导出文件下载地址/Base64',
    description: '参考电查查专业化展示需求，支持Excel/PDF导出，满足合规上报分析。'
  },
];
