// Products tab data — 1:1 match from wireframe screenshots

export interface ProductItem {
  name: string;
  id: string;
  complexity: 'Low' | 'Moderate' | 'High';
  status: 'Auto' | 'Guided' | 'Manual' | 'Blocked';
  rcaTarget: string;
}

export const PRODUCT_STATS = [
  { value: '179', label: 'Items' },
  { value: '0', label: 'High' },
  { value: '0', label: 'Guided Selling' },
  { value: '0', label: 'QLE Customizations' },
];

export const MIGRATION_STATUS = {
  auto: 160,
  guided: 19,
  manual: 0,
  blocked: 0,
};

export const PRODUCT_ITEMS: ProductItem[] = [
  { name: 'Monthly Named Users', id: 'Product2:0t13×000008zVqPAAU', complexity: 'Low', status: 'Auto', rcaTarget: 'ProductSellingModel' },
  { name: 'SmartBytes Enterprise Core', id: 'Product2:0t13×000008zVqQAAU', complexity: 'Low', status: 'Auto', rcaTarget: 'ProductSellingModel' },
  { name: 'Anomaly Detection', id: 'Product2:0t13×000008zVqRAAU', complexity: 'Low', status: 'Auto', rcaTarget: 'ProductSellingModel' },
  { name: 'Data Normalization Expert', id: 'Product2:0t13×000008zVqSAAU', complexity: 'Low', status: 'Auto', rcaTarget: 'ProductSellingModel' },
  { name: 'Intel Xeon E5-2667 v4 3.2GHz', id: 'Product2:0t13×000008zVqTAAU', complexity: 'Low', status: 'Auto', rcaTarget: 'ProductSellingModel' },
  { name: 'SmartBytes Fundamentals Training', id: 'Product2:0t13×000008zVqUAAU', complexity: 'Low', status: 'Auto', rcaTarget: 'ProductSellingModel' },
  { name: 'Professional Services - Project Management Daily Rate', id: 'Product2:0t13×000008zVqXAAU', complexity: 'Low', status: 'Auto', rcaTarget: 'ProductSellingModel' },
  { name: 'Quick Start Enablement', id: 'Product2:0t13×000008zVqYAAU', complexity: 'Low', status: 'Auto', rcaTarget: 'ProductSellingModel' },
  { name: 'Ad Hoc', id: 'Product2:0t13×000008zVqZAAU', complexity: 'Low', status: 'Auto', rcaTarget: 'ProductSellingModel' },
  { name: 'Professional Services Project', id: 'Product2:0t13×000008zVqaAAE', complexity: 'Moderate', status: 'Guided', rcaTarget: 'ProductSellingModel' },
  { name: 'Program Director', id: 'Product2:0t13×000008zVqbAAE', complexity: 'Low', status: 'Auto', rcaTarget: 'ProductSellingModel' },
  { name: 'Project Manager', id: 'Product2:0t13×000008zVqcAAE', complexity: 'Low', status: 'Auto', rcaTarget: 'ProductSellingModel' },
  { name: 'Solutions Architect', id: 'Product2:0t13×000008zVqdAAE', complexity: 'Low', status: 'Auto', rcaTarget: 'ProductSellingModel' },
  { name: 'Implementation Engineer', id: 'Product2:0t13×000008zVqeAAE', complexity: 'Low', status: 'Auto', rcaTarget: 'ProductSellingModel' },
  { name: 'Module Extension Engineer', id: 'Product2:0t13×000008zVqfAAE', complexity: 'Low', status: 'Auto', rcaTarget: 'ProductSellingModel' },
  { name: 'PowerSlide R750 Rack Server', id: 'Product2:0t13×000008zVqgAAE', complexity: 'Moderate', status: 'Guided', rcaTarget: 'ProductSellingModel' },
  { name: 'Intel Xeon E5-2683 v4 2.1GHz', id: 'Product2:0t13×000008zVqhAAE', complexity: 'Low', status: 'Auto', rcaTarget: 'ProductSellingModel' },
  { name: '16GB RDIMM, 2133MT/s', id: 'Product2:0t13×000008zVqiAAE', complexity: 'Low', status: 'Auto', rcaTarget: 'ProductSellingModel' },
  { name: '8TB 7.2k RPM NLSAS', id: 'Product2:0t13×000008zVqjAAE', complexity: 'Low', status: 'Auto', rcaTarget: 'ProductSellingModel' },
];
