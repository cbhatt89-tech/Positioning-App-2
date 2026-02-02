import React, { useState, useEffect } from 'react';

const ClusterAnalysis = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [showCompetitors, setShowCompetitors] = useState(false);
  const [showNewData, setShowNewData] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationPhase(1), 100);
    return () => clearTimeout(timer);
  }, [currentScreen]);

  // Cluster definitions: Need + Features that solve it
  const clusters = {
    admin: {
      name: 'Admin & Invoice Relief',
      need: 'Reduce manual admin burden and invoice processing time',
      color: { bg: 'rgba(99, 102, 241, 0.08)', border: '#6366f1', text: '#818cf8' },
      position: { cx: 18, cy: 28, rx: 16, ry: 18 },
      labelPos: { x: 3, y: 10 },
      features: [
        { id: 'a1', name: 'Invoice digitization', x: 12, y: 22, importance: 'high' },
        { id: 'a2', name: 'Invoice processing automation', x: 22, y: 18, importance: 'high' },
        { id: 'a3', name: 'Receipt scanning', x: 8, y: 32, importance: 'medium' },
        { id: 'a4', name: 'Automated data entry', x: 25, y: 30, importance: 'medium' },
        { id: 'a5', name: 'Supplier document management', x: 18, y: 38, importance: 'medium' },
      ]
    },
    cost: {
      name: 'Cost & Margin Control',
      need: 'Understand and protect profit margins in real-time',
      color: { bg: 'rgba(16, 185, 129, 0.08)', border: '#10b981', text: '#34d399' },
      position: { cx: 75, cy: 26, rx: 15, ry: 17 },
      labelPos: { x: 60, y: 8 },
      features: [
        { id: 'c1', name: 'Recipe costing', x: 70, y: 20, importance: 'high' },
        { id: 'c2', name: 'Real-time margin tracking', x: 80, y: 24, importance: 'high' },
        { id: 'c3', name: 'Yield management', x: 68, y: 30, importance: 'medium' },
        { id: 'c4', name: 'Price fluctuation alerts', x: 78, y: 34, importance: 'high' },
        { id: 'c5', name: 'COGS reporting', x: 72, y: 38, importance: 'medium' },
      ]
    },
    supplier: {
      name: 'Supplier & Inventory',
      need: 'Maintain optimal stock levels and supplier relationships',
      color: { bg: 'rgba(245, 158, 11, 0.08)', border: '#f59e0b', text: '#fbbf24' },
      position: { cx: 45, cy: 55, rx: 17, ry: 15 },
      labelPos: { x: 28, y: 40 },
      features: [
        { id: 's1', name: 'Stock counting app', x: 40, y: 50, importance: 'high' },
        { id: 's2', name: 'Supplier price alerts', x: 50, y: 48, importance: 'high' },
        { id: 's3', name: 'Ordering automation', x: 42, y: 60, importance: 'medium' },
        { id: 's4', name: 'Inventory tracking', x: 52, y: 58, importance: 'high' },
        { id: 's5', name: 'Par level management', x: 38, y: 65, importance: 'medium' },
      ]
    },
    operations: {
      name: 'Multi-site Operations',
      need: 'Visibility and control across all locations',
      color: { bg: 'rgba(239, 68, 68, 0.08)', border: '#ef4444', text: '#f87171' },
      position: { cx: 20, cy: 78, rx: 15, ry: 14 },
      labelPos: { x: 3, y: 62 },
      features: [
        { id: 'o1', name: 'Multi-site dashboards', x: 15, y: 72, importance: 'high' },
        { id: 'o2', name: 'POS integrations', x: 25, y: 76, importance: 'medium' },
        { id: 'o3', name: 'Accounting sync', x: 18, y: 82, importance: 'medium' },
        { id: 'o4', name: 'Mobile app access', x: 12, y: 85, importance: 'medium' },
        { id: 'o5', name: 'Role-based permissions', x: 28, y: 82, importance: 'low' },
      ]
    }
  };

  // Competitor positions - which features they cover
  const competitors = [
    { 
      name: 'MarketMan', 
      logo: 'MM',
      color: '#6366f1',
      tagline: 'Enterprise inventory & invoicing',
      features: [
        { x: 14, y: 24, feature: 'Invoice digitization', strength: 'strong' },
        { x: 42, y: 52, feature: 'Stock counting', strength: 'strong' },
        { x: 72, y: 22, feature: 'Recipe costing', strength: 'medium' },
        { x: 17, y: 74, feature: 'Multi-site dashboards', strength: 'strong' },
        { x: 50, y: 56, feature: 'Inventory tracking', strength: 'strong' },
      ]
    },
    { 
      name: 'KitchenCut', 
      logo: 'KC',
      color: '#f59e0b',
      tagline: 'Recipe & margin focused',
      features: [
        { x: 78, y: 26, feature: 'Real-time margins', strength: 'strong' },
        { x: 68, y: 32, feature: 'Yield management', strength: 'strong' },
        { x: 48, y: 50, feature: 'Supplier alerts', strength: 'medium' },
        { x: 20, y: 20, feature: 'Invoice processing', strength: 'medium' },
      ]
    },
    { 
      name: 'Nory', 
      logo: 'NY',
      color: '#10b981',
      tagline: 'AI forecasting & analytics',
      features: [
        { x: 82, y: 22, feature: 'AI margin forecasting', strength: 'strong' },
        { x: 74, y: 36, feature: 'Price alerts', strength: 'strong' },
        { x: 44, y: 58, feature: 'Stock management', strength: 'medium' },
        { x: 32, y: 70, feature: 'Labor optimization', strength: 'strong' },
      ]
    },
    { 
      name: 'Jolt', 
      logo: 'JT',
      color: '#ef4444',
      tagline: 'Operations & checklists',
      features: [
        { x: 22, y: 78, feature: 'Digital checklists', strength: 'strong' },
        { x: 46, y: 62, feature: 'Stock counts', strength: 'medium' },
        { x: 26, y: 84, feature: 'Operations audits', strength: 'strong' },
        { x: 10, y: 80, feature: 'Task management', strength: 'strong' },
      ]
    },
  ];

  // New interview data
  const interviewNeeds = [
    // Whitespace opportunities
    { id: 'n1', name: 'Waste tracking & reduction', x: 58, y: 12, isWhitespace: true, insight: 'Mentioned by 8/10 interviewees. No competitor addresses this directly.' },
    { id: 'n2', name: 'Menu engineering insights', x: 88, y: 42, isWhitespace: true, insight: 'Chefs want data on dish profitability vs popularity matrix.' },
    { id: 'n3', name: 'Seasonal menu planning', x: 85, y: 58, isWhitespace: true, insight: 'Linking supplier availability to menu cycles.' },
    { id: 'n4', name: 'Allergen compliance tracking', x: 55, y: 88, isWhitespace: true, insight: 'Regulatory pressure increasing. Major pain point.' },
    { id: 'n5', name: 'Staff training modules', x: 6, y: 55, isWhitespace: true, insight: 'Onboarding new kitchen staff is slow and inconsistent.' },
    { id: 'n6', name: 'Sustainability reporting', x: 65, y: 6, isWhitespace: true, insight: 'ESG requirements filtering down to hospitality.' },
    // Falls into existing clusters
    { id: 'n7', name: 'Real-time COGS alerts', x: 76, y: 30, isWhitespace: false, cluster: 'cost', insight: 'Validates importance of margin tracking cluster.' },
    { id: 'n8', name: 'Auto-reorder triggers', x: 36, y: 62, isWhitespace: false, cluster: 'supplier', insight: 'Extends existing ordering automation need.' },
  ];

  const renderClusterZones = () => (
    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
      {Object.entries(clusters).map(([key, cluster]) => (
        <ellipse 
          key={key}
          cx={`${cluster.position.cx}%`} 
          cy={`${cluster.position.cy}%`} 
          rx={`${cluster.position.rx}%`} 
          ry={`${cluster.position.ry}%`} 
          fill={cluster.color.bg} 
          stroke={cluster.color.border} 
          strokeWidth="1.5" 
          strokeDasharray="6 4" 
          opacity="0.7" 
        />
      ))}
    </svg>
  );

  const renderClusterLabels = () => (
    <>
      {Object.entries(clusters).map(([key, cluster]) => (
        <div
          key={key}
          className="absolute"
          style={{
            left: `${cluster.labelPos.x}%`,
            top: `${cluster.labelPos.y}%`,
            maxWidth: '180px',
          }}
        >
          <div 
            className="font-semibold text-xs tracking-wide mb-1"
            style={{ color: cluster.color.text, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '10px' }}
          >
            {cluster.name}
          </div>
          <div className="text-xs opacity-60" style={{ color: '#a0a0b0', fontSize: '9px', lineHeight: 1.3 }}>
            {cluster.need}
          </div>
        </div>
      ))}
    </>
  );

  const renderJellyFeatures = () => (
    <>
      {Object.entries(clusters).map(([clusterKey, cluster]) => (
        cluster.features.map((feature, index) => (
          <div
            key={feature.id}
            className="absolute transition-all duration-500 ease-out cursor-pointer group"
            style={{
              left: `${feature.x}%`,
              top: `${feature.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: animationPhase ? 1 : 0,
              transitionDelay: `${index * 50}ms`,
              zIndex: hoveredItem === feature.id ? 50 : 10,
            }}
            onMouseEnter={() => setHoveredItem(feature.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div 
              className={`relative flex items-center justify-center rounded-full shadow-lg transition-transform duration-200 ${hoveredItem === feature.id ? 'scale-150' : ''}`}
              style={{
                width: feature.importance === 'high' ? '14px' : feature.importance === 'medium' ? '11px' : '8px',
                height: feature.importance === 'high' ? '14px' : feature.importance === 'medium' ? '11px' : '8px',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                border: `2px solid #e94560`,
                boxShadow: hoveredItem === feature.id ? '0 0 20px rgba(233, 69, 96, 0.5)' : '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              {feature.importance === 'high' && (
                <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: '#e94560' }} />
              )}
            </div>
            <div 
              className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1.5 rounded text-xs whitespace-nowrap transition-all duration-200 ${hoveredItem === feature.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}
              style={{
                background: 'rgba(26, 26, 46, 0.98)',
                color: '#fff',
                border: '1px solid rgba(233, 69, 96, 0.4)',
                fontSize: '10px',
                fontWeight: 500,
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                zIndex: 100,
              }}
            >
              {feature.name}
            </div>
          </div>
        ))
      ))}
    </>
  );

  const renderCompetitors = () => {
    if (!showCompetitors) return null;
    
    return (
      <>
        {competitors.map((competitor, compIndex) => (
          competitor.features.map((pos, idx) => (
            <div
              key={`${competitor.name}-${idx}`}
              className="absolute transition-all duration-500 ease-out group"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
                opacity: showCompetitors ? 1 : 0,
                transitionDelay: `${compIndex * 150 + idx * 80}ms`,
                zIndex: 25,
              }}
            >
              <div 
                className="flex items-center justify-center rounded shadow-lg text-white font-bold transition-transform hover:scale-125 cursor-pointer"
                style={{
                  width: pos.strength === 'strong' ? '26px' : '22px',
                  height: pos.strength === 'strong' ? '26px' : '22px',
                  background: competitor.color,
                  fontSize: '8px',
                  letterSpacing: '0.5px',
                  border: pos.strength === 'strong' ? '2px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.2)',
                }}
              />
              <div 
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1.5 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: competitor.color,
                  color: '#fff',
                  fontSize: '9px',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              >
                <div className="font-bold">{competitor.name}</div>
                <div className="opacity-80">{pos.feature}</div>
              </div>
            </div>
          ))
        ))}
      </>
    );
  };

  const renderInterviewData = () => {
    if (!showNewData) return null;
    
    return (
      <>
        {interviewNeeds.map((need, index) => (
          <div
            key={need.id}
            className="absolute transition-all duration-500 ease-out cursor-pointer group"
            style={{
              left: `${need.x}%`,
              top: `${need.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: showNewData ? 1 : 0,
              transitionDelay: `${index * 100}ms`,
              zIndex: 35,
            }}
          >
            <div className="relative">
              <div 
                className={`flex items-center justify-center rounded-full shadow-lg ${need.isWhitespace ? 'animate-pulse' : ''}`}
                style={{
                  width: '22px',
                  height: '22px',
                  background: need.isWhitespace 
                    ? 'linear-gradient(135deg, #00d9ff 0%, #00ff94 100%)'
                    : 'linear-gradient(135deg, #ff6b6b 0%, #ffa502 100%)',
                  border: need.isWhitespace ? '2px solid #00ff94' : '2px solid #ffa502',
                  boxShadow: need.isWhitespace 
                    ? '0 0 20px rgba(0, 255, 148, 0.5)' 
                    : '0 0 12px rgba(255, 165, 2, 0.4)',
                }}
              >
                <span style={{ color: need.isWhitespace ? '#003d33' : '#fff', fontSize: '10px', fontWeight: 700 }}>
                  {need.isWhitespace ? '★' : '●'}
                </span>
              </div>
              <div 
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-2 rounded text-xs opacity-0 group-hover:opacity-100 transition-all duration-200"
                style={{
                  background: need.isWhitespace ? 'rgba(0, 40, 35, 0.98)' : 'rgba(60, 30, 10, 0.98)',
                  border: need.isWhitespace ? '1px solid #00ff94' : '1px solid #ffa502',
                  color: '#fff',
                  fontSize: '10px',
                  minWidth: '180px',
                  maxWidth: '220px',
                  whiteSpace: 'normal',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  zIndex: 100,
                }}
              >
                <div className="font-bold mb-1" style={{ color: need.isWhitespace ? '#00ff94' : '#ffa502' }}>
                  {need.name}
                </div>
                <div className="opacity-80 leading-snug">{need.insight}</div>
                {need.isWhitespace && (
                  <div className="mt-1.5 text-xs font-semibold" style={{ color: '#00ff94' }}>
                    ⚡ Whitespace Opportunity
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const renderLegend = () => (
    <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
      {/* Jelly indicator - always shown */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(233, 69, 96, 0.15)', border: '1px solid rgba(233, 69, 96, 0.3)' }}>
        <div className="w-3 h-3 rounded-full" style={{ background: '#1a1a2e', border: '2px solid #e94560' }} />
        <span className="text-xs font-medium" style={{ color: '#e94560' }}>Jelly Features</span>
      </div>

      {/* Competitor toggle - screens 2 & 3 */}
      {(currentScreen === 2 || currentScreen === 3) && (
        <button
          onClick={() => setShowCompetitors(!showCompetitors)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all text-left"
          style={{
            background: showCompetitors ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.03)',
            border: showCompetitors ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid rgba(255,255,255,0.1)',
            color: showCompetitors ? '#818cf8' : '#707080',
          }}
        >
          <span className="w-4 h-4 rounded flex items-center justify-center text-xs" style={{ background: showCompetitors ? '#6366f1' : 'transparent', border: showCompetitors ? 'none' : '1px solid #505060' }}>
            {showCompetitors ? '✓' : ''}
          </span>
          Competitors
        </button>
      )}

      {/* Interview data toggle - screen 3 only */}
      {currentScreen === 3 && (
        <button
          onClick={() => setShowNewData(!showNewData)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all text-left"
          style={{
            background: showNewData ? 'rgba(0, 255, 148, 0.12)' : 'rgba(255,255,255,0.03)',
            border: showNewData ? '1px solid rgba(0, 255, 148, 0.4)' : '1px solid rgba(255,255,255,0.1)',
            color: showNewData ? '#00ff94' : '#707080',
          }}
        >
          <span className="w-4 h-4 rounded flex items-center justify-center text-xs" style={{ background: showNewData ? '#00ff94' : 'transparent', border: showNewData ? 'none' : '1px solid #505060', color: '#003d33' }}>
            {showNewData ? '✓' : ''}
          </span>
          Interview Data
        </button>
      )}

      {/* Competitor legend when shown */}
      {showCompetitors && (currentScreen === 2 || currentScreen === 3) && (
        <div className="mt-2 p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="text-xs font-medium mb-2" style={{ color: '#808090' }}>Competitors</div>
          <div className="flex flex-col gap-1.5">
            {competitors.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded flex items-center justify-center text-white" style={{ background: c.color, fontSize: '7px', fontWeight: 700 }}>
                  {c.logo}
                </div>
                <div>
                  <div className="text-xs font-medium" style={{ color: c.color }}>{c.name}</div>
                  <div className="text-xs opacity-50" style={{ color: '#a0a0a0', fontSize: '8px' }}>{c.tagline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interview legend when shown */}
      {showNewData && currentScreen === 3 && (
        <div className="mt-2 p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="text-xs font-medium mb-2" style={{ color: '#808090' }}>Interview Insights</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00d9ff 0%, #00ff94 100%)', fontSize: '8px', color: '#003d33' }}>★</div>
              <span className="text-xs" style={{ color: '#00ff94' }}>Whitespace (6)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa502 100%)', fontSize: '8px', color: '#fff' }}>●</div>
              <span className="text-xs" style={{ color: '#ffa502' }}>Existing Cluster (2)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderStrategicPanel = () => {
    if (currentScreen !== 3 || !showNewData) return null;
    
    return (
      <div 
        className="absolute right-0 top-0 bottom-16 w-80 overflow-y-auto p-4 transition-all duration-500"
        style={{ 
          background: 'linear-gradient(180deg, rgba(20, 20, 40, 0.98) 0%, rgba(15, 25, 45, 0.98) 100%)',
          borderLeft: '1px solid rgba(233, 69, 96, 0.15)',
          opacity: showNewData ? 1 : 0,
          transform: showNewData ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div className="mb-4">
          <h3 className="text-sm font-bold mb-1" style={{ color: '#00ff94' }}>🎯 Strategic Summary</h3>
          <p className="text-xs opacity-50" style={{ color: '#a0a0b0' }}>AI-generated from interview analysis</p>
          <div className="h-px w-full mt-3" style={{ background: 'linear-gradient(90deg, #00ff94, transparent)' }} />
        </div>
        
        <div className="space-y-4 text-xs" style={{ color: '#d0d0e0' }}>
          <div className="p-3 rounded-lg" style={{ background: 'rgba(0, 255, 148, 0.06)', border: '1px solid rgba(0, 255, 148, 0.15)' }}>
            <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: '#00ff94' }}>
              <span>💎</span> Whitespace Opportunities
            </h4>
            <ul className="space-y-2">
              <li><strong>Waste Tracking</strong> — No competitor presence. 8/10 interviewees mentioned. High-value sustainability angle.</li>
              <li><strong>Menu Engineering</strong> — Adjacent to cost control. Natural Jelly expansion path.</li>
              <li><strong>Allergen Compliance</strong> — Regulatory pressure increasing. First-mover advantage available.</li>
              <li><strong>Staff Training</strong> — Connects to operations. Retention/onboarding pain point.</li>
            </ul>
          </div>
          
          <div className="p-3 rounded-lg" style={{ background: 'rgba(233, 69, 96, 0.06)', border: '1px solid rgba(233, 69, 96, 0.15)' }}>
            <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: '#e94560' }}>
              <span>⚔️</span> Competitive Insights
            </h4>
            <ul className="space-y-2">
              <li><strong>MarketMan</strong> — Strongest in invoice + multi-site. Direct competitor.</li>
              <li><strong>Nory</strong> — Owns AI/forecasting. Avoid head-to-head here.</li>
              <li><strong>Jolt</strong> — Operations/checklists. Watch for overlap.</li>
              <li><strong>KitchenCut</strong> — Cost control focus. Recipe costing competitor.</li>
            </ul>
          </div>
          
          <div className="p-3 rounded-lg" style={{ background: 'rgba(99, 102, 241, 0.06)', border: '1px solid rgba(99, 102, 241, 0.15)' }}>
            <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: '#818cf8' }}>
              <span>🚀</span> Recommended Actions
            </h4>
            <ol className="space-y-2 list-decimal list-inside">
              <li><strong>Build</strong> waste tracking as immediate differentiator</li>
              <li><strong>Extend</strong> cost cluster into menu engineering</li>
              <li><strong>Partner</strong> for allergen compliance (speed to market)</li>
              <li><strong>Defend</strong> invoice automation — highest competitive overlap</li>
            </ol>
          </div>
          
          <div className="p-3 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.15)' }}>
            <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: '#fbbf24' }}>
              <span>📊</span> Position Summary
            </h4>
            <p className="leading-relaxed">
              Jelly has strong coverage in <strong>invoice automation</strong> and <strong>supplier management</strong> with clear pricing advantage (£75/mo vs £239/mo MarketMan). 
              Interviews revealed <strong>6 whitespace opportunities</strong> with zero competitor presence. 
              <strong>Waste tracking</strong> and <strong>menu engineering</strong> represent highest-value expansion paths given existing capabilities.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const screenTitles = {
    1: { title: 'Customer Needs Cluster Map', subtitle: "Jelly's core feature positioning in UK hospitality" },
    2: { title: 'Competitive Landscape', subtitle: 'Toggle competitors to see market coverage' },
    3: { title: 'Interview Insights', subtitle: 'New needs from user research + strategic recommendations' },
  };

  return (
    <div 
      className="w-full h-screen overflow-hidden relative"
      style={{ 
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Header */}
      <div className="absolute top-4 left-4 z-50">
        <h2 className="text-xl font-bold mb-1" style={{ color: '#e94560' }}>{screenTitles[currentScreen].title}</h2>
        <p className="text-xs opacity-70" style={{ color: '#a0a0b0' }}>{screenTitles[currentScreen].subtitle}</p>
      </div>

      {/* Legend and toggles */}
      {renderLegend()}

      {/* Main map area */}
      <div className="absolute inset-0 pt-16 pb-20" style={{ right: currentScreen === 3 && showNewData ? '320px' : '0' }}>
        {renderClusterZones()}
        {renderClusterLabels()}
        {renderJellyFeatures()}
        {renderCompetitors()}
        {renderInterviewData()}
      </div>

      {/* Strategic panel (screen 3 only) */}
      {renderStrategicPanel()}

      {/* Navigation */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-16 flex items-center justify-center gap-3 px-6"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(15, 15, 35, 0.98) 40%)' }}
      >
        {[1, 2, 3].map((screen) => (
          <button
            key={screen}
            onClick={() => {
              setAnimationPhase(0);
              setCurrentScreen(screen);
              // Reset toggles when changing screens
              if (screen === 1) {
                setShowCompetitors(false);
                setShowNewData(false);
              }
            }}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              background: currentScreen === screen 
                ? 'linear-gradient(135deg, #e94560 0%, #d63384 100%)'
                : 'rgba(255,255,255,0.03)',
              color: currentScreen === screen ? '#fff' : '#808090',
              border: currentScreen === screen ? 'none' : '1px solid rgba(255,255,255,0.08)',
              boxShadow: currentScreen === screen ? '0 4px 20px rgba(233, 69, 96, 0.3)' : 'none',
            }}
          >
            {screen === 1 && 'Jelly Needs Map'}
            {screen === 2 && 'Competitor Overlay'}
            {screen === 3 && 'Interview Insights'}
          </button>
        ))}
      </div>
      
      {/* Jelly Logo */}
      <div 
        className="fixed bottom-4 right-4 px-3 py-1.5 rounded-lg font-bold tracking-wider z-50"
        style={{ 
          background: 'linear-gradient(135deg, #e94560 0%, #d63384 100%)',
          color: '#fff',
          fontSize: '11px',
          letterSpacing: '2px',
        }}
      >
        JELLY
      </div>
    </div>
  );
};

export default ClusterAnalysis;
