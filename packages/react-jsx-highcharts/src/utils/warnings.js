/* eslint-disable no-console */
import { findKey } from 'lodash-es';

const titleCSS = 'color:red; font-size:20px; font-weight: bold;';
const descCSS = color => `font-size: 16px; color:${color};`;
const descDefaultCSS = descCSS('#000');
const descDefaultItalicCSS = descCSS('#000') + 'font-style:italic;';
const descKeywordCSS = descCSS('#008') + 'font-weight:600;';
const descStringCSS = descCSS('#080');
const descCommentCSS = descCSS('#808080') + 'font-style:italic;';
const descNewLine = 'font-size: 1px; margin-right: 100%;';

const moduleToImportPath = {
  annotations: 'modules/annotations',
  more: 'highcharts-more',
  threeD: 'highcharts-3d',
  bullet: 'modules/bullet',
  cylinder: 'modules/cylinder',
  funnel: 'modules/funnel',
  histogram: 'modules/histogram-bellcurve',
  networkgraph: 'modules/networkgraph',
  pareto: 'modules/pareto',
  sankey: 'modules/sankey',
  solidgauge: 'modules/solid-gauge',
  streamgraph: 'modules/streamgraph',
  sunburst: 'modules/sunburst',
  tilemap: 'modules/tilemap',
  treemap: 'modules/treemap',
  variablepie: 'modules/variable-pie',
  variwide: 'modules/variwide',
  vector: 'modules/vector',
  venn: 'modules/venn',
  windbarb: 'modules/windbarb',
  xrange: 'modules/xrange'
};

const moduleToVarName = {
  annotations: 'addAnnotations',
  more: 'addHighchartsMore',
  threeD: 'addHighcharts3DModule',
  bullet: 'addBulletModule',
  cylinder: 'addCylinderModule',
  funnel: 'addFunnelModule',
  histogram: 'addHistogramBellCurveModule',
  networkgraph: 'addNetworkGraphModule',
  pareto: 'addParetoModule',
  sankey: 'addSankeyModule',
  solidgauge: 'addSolidGaugeModule',
  streamgraph: 'addStreamGraphModule',
  sunburst: 'addSunburstModule',
  tilemap: 'addTilemapModule',
  treemap: 'addTreemapModule',
  variablepie: 'addVariablePieModule',
  variwide: 'addVariwideModule',
  vector: 'addVectorModule',
  venn: 'addVennModule',
  windbarb: 'addWindBarbModule',
  xrange: 'addXRangeModule'
};

const moduleToFeatureMap = {
  annotations: ['annotations'],
  more: [
    'arearange', 'areasplinerange', 'boxplot', 'bubble', 'columnrange', 'columnpyramid',
    'errorbar', 'gauge', 'packedbubble', 'polygon', 'waterfall'
  ],
  threeD: ['scatter3d'],
  bullet: ['bullet'],
  cylinder: ['cylinder'],
  funnel: ['funnel', 'pyramid'],
  histogram: ['histogram', 'bellcurve'],
  networkgraph: ['networkgraph'],
  pareto: ['pareto'],
  sankey: ['sankey'],
  solidgauge: ['solidgauge'],
  streamgraph: ['streamgraph'],
  sunburst: ['sunburst'],
  tilemap: ['tilemap'],
  treemap: ['treemap'],
  variablepie: ['variablepie'],
  variwide: ['variwide'],
  vector: ['vector'],
  venn: ['venn'],
  windbarb: ['windbarb'],
  xrange: ['xrange']
};

const findModule = feature => {
  return findKey(moduleToFeatureMap, features => features.indexOf(feature) !== -1)
}

const logDetailedErrorMessage = (warning, module) => {
  const importPath = moduleToImportPath[module];
  const varName = moduleToVarName[module];

  console.group("React JSX Highcharts error");
  console.log(`%c${warning}`, titleCSS);
  console.log('More information: https://github.com/whawker/react-jsx-highcharts/wiki/Highcharts-error-%2317');
  console.log(
    `You likely need to import the additional module, try adding
    %c
    %c %cimport %cHighcharts %cfrom %c'highcharts'%c;
    %c %cimport %c${varName} %cfrom %c'highcharts/${importPath}'%c;
    %c
    %c %c// After imports, but before component - apply additional functionality from module to Highcharts
    %c %c${varName}%c(Highcharts);`.replace(/^ +/gm, ''),
    descNewLine,
    descNewLine, descKeywordCSS, descDefaultCSS, descKeywordCSS, descStringCSS, descDefaultCSS,
    descNewLine, descKeywordCSS, descDefaultCSS, descKeywordCSS, descStringCSS, descDefaultCSS,
    descNewLine,
    descNewLine, descCommentCSS,
    descNewLine, descDefaultItalicCSS, descDefaultCSS
  );
  console.groupEnd();
}

export const logSeriesErrorMessage = seriesType => {
  if (process.env.NODE_ENV === 'development') {
    const warning = `This series type "${seriesType}" requires an additional Highcharts module`;
    const module = findModule(seriesType);

    if (!module) {
      console.warn(`${warning}, or is invalid.`);
      return
    }

    logDetailedErrorMessage(warning, module);
  }
}

export const logModuleErrorMessage = (componentName, moduleName) => {
  if (process.env.NODE_ENV === 'development') {
    const warning = `This component "${componentName}" requires an additional Highcharts module`;
    const module = findModule(moduleName);

    if (!module) {
      console.warn(`${warning}, or is invalid.`);
      return
    }

    logDetailedErrorMessage(warning, module);
  }
}

export const log3DModuleErrorMessage = () => {
  if (process.env.NODE_ENV === 'development') {
    logDetailedErrorMessage('3D features such as "ZAxis" require an additional Highcharts module', 'threeD');
  }
}