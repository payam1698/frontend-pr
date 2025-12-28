import React from 'react';
import { Printer, ArrowRight } from 'lucide-react';
import Button from './Button';

interface ScaleData {
  raw: number;
  br: number;
  xCor: number;
  hxCor: number;
  daAdj?: number;
  ddAdj?: number;
  dcAdj?: number;
  inpAdj?: number;
  final: number;
}

interface McmiReport {
  xScore: number;
  adjustedScores: Record<string, ScaleData>;
}

interface TestData {
  first_name?: string;
  last_name?: string;
  gender?: string;
  age?: number;
  education_level?: string;
  marital_status?: string;
  inpatient_status?: string;
  createdAt?: string;
  calculated_scales?: McmiReport;
}

interface McmiReportViewProps {
  testData: TestData;
  onBack?: () => void;
}

const scaleNames: Record<string, { code: string; name: string }> = {
  '1': { code: 'Y', name: 'Desirability' },
  '2': { code: 'Z', name: 'Debasement' },
  '3': { code: '1', name: 'Schizoid' },
  '4': { code: '2', name: 'Avoidant' },
  '5': { code: '3', name: 'Dependent' },
  '6': { code: '4', name: 'Histrionic' },
  '7': { code: '5', name: 'Narcissistic' },
  '8': { code: '6A', name: 'Antisocial' },
  '9': { code: '6B', name: 'Aggressive/Sadistic' },
  '10': { code: '7', name: 'Compulsive' },
  '11': { code: '8A', name: 'Passive-Aggressive' },
  '12': { code: '8B', name: 'Self-defeating' },
  '13': { code: 'S', name: 'Schizotypal' },
  '14': { code: 'C', name: 'Borderline' },
  '15': { code: 'P', name: 'Paranoid' },
  '16': { code: 'A', name: 'Anxiety' },
  '17': { code: 'H', name: 'Somatoform' },
  '18': { code: 'N', name: 'Bipolar:Manic' },
  '19': { code: 'D', name: 'Dysthymia' },
  '20': { code: 'B', name: 'Alcohol dependence' },
  '21': { code: 'T', name: 'Drug dependence' },
  '22': { code: 'SS', name: 'Thought Disorder' },
  '23': { code: 'CC', name: 'Major Depression' },
  '24': { code: 'PP', name: 'Delusional disorder' },
  '25': { code: 'X', name: 'Disclosure' }
};

const McmiReportView: React.FC<McmiReportViewProps> = ({ testData, onBack }) => {
  const report = testData.calculated_scales;
  
  if (!report || !report.adjustedScores) {
    return (
      <div className="text-center py-12 text-gray-500">
        اطلاعات گزارش در دسترس نیست.
      </div>
    );
  }

  const scaleOrder = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];

  const getInpLabel = (val: string | undefined) => {
    switch(val) {
      case '1': return 'Outpatient';
      case '2': return '< 1 Week';
      case '3': return '1-4 Weeks';
      case '4': return '> 4 Weeks';
      default: return 'Unknown';
    }
  };

  const printReport = () => {
    window.print();
  };

  const fullName = `${testData.first_name || ''} ${testData.last_name || ''}`.trim() || 'N/A';
  const testDate = testData.createdAt ? new Date(testData.createdAt).toLocaleDateString('en-US') : new Date().toLocaleDateString('en-US');

  return (
    <div>
      {onBack && (
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-brand font-medium mb-4 hover:underline"
        >
          <ArrowRight size={18} />
          بازگشت به لیست
        </button>
      )}
      
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-lg printable-content" dir="ltr">
        <div className="flex justify-between items-start mb-8 border-b-2 border-gray-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">MCMI-II Final Report</h1>
            <p className="text-gray-500 text-sm">Ravankargah Institute</p>
          </div>
          <div className="hidden print:hidden md:block">
            <Button variant="outline" onClick={printReport} className="flex gap-2">
              <Printer size={18} /> Print / Save PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 mb-8 text-sm bg-gray-50 p-4 rounded-xl border border-gray-200 print:bg-transparent print:border-none print:p-0">
          <div><span className="font-bold text-gray-700">Name:</span> {fullName}</div>
          <div><span className="font-bold text-gray-700">Age:</span> {testData.age || 'N/A'}</div>
          <div><span className="font-bold text-gray-700">Gender:</span> {testData.gender === 'male' ? 'Male' : testData.gender === 'female' ? 'Female' : 'N/A'}</div>
          <div><span className="font-bold text-gray-700">Education:</span> {testData.education_level || 'N/A'}</div>
          <div><span className="font-bold text-gray-700">Marital Status:</span> {testData.marital_status || 'N/A'}</div>
          <div><span className="font-bold text-gray-700">Inpatient:</span> {getInpLabel(testData.inpatient_status)}</div>
          <div><span className="font-bold text-gray-700">Date:</span> {testDate}</div>
          <div><span className="font-bold text-gray-700">X (Disclosure):</span> {report.xScore}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-800 print:bg-gray-200">
                <th className="p-2 border border-gray-300 text-center">Code</th>
                <th className="p-2 border border-gray-300 text-left">Scale</th>
                <th className="p-2 border border-gray-300 text-center w-12">Raw</th>
                <th className="p-2 border border-gray-300 text-center w-12">BR</th>
                <th className="p-2 border border-gray-300 text-center w-12">X Cor</th>
                <th className="p-2 border border-gray-300 text-center w-12">1/2X</th>
                <th className="p-2 border border-gray-300 text-center w-12">DA</th>
                <th className="p-2 border border-gray-300 text-center w-12">DD</th>
                <th className="p-2 border border-gray-300 text-center w-12">DC</th>
                <th className="p-2 border border-gray-300 text-center w-12">Inp</th>
                <th className="p-2 border border-gray-300 text-center w-12 bg-gray-200 font-bold">Final</th>
              </tr>
            </thead>
            <tbody>
              {scaleOrder.map(scaleId => {
                const s = report.adjustedScores[scaleId];
                if (!s) return null;
                const info = scaleNames[scaleId];
                if (!info) return null;
                const isSignificant = s.final >= 75;
                const isHigh = s.final >= 85;

                return (
                  <tr key={scaleId} className={`${isHigh ? 'bg-red-50' : isSignificant ? 'bg-orange-50' : ''} hover:bg-gray-50`}>
                    <td className="p-2 border border-gray-300 text-center font-mono">{info.code}</td>
                    <td className="p-2 border border-gray-300">{info.name}</td>
                    <td className="p-2 border border-gray-300 text-center text-gray-500">{s.raw}</td>
                    <td className="p-2 border border-gray-300 text-center text-gray-500">{s.br}</td>
                    <td className="p-2 border border-gray-300 text-center text-gray-400 text-xs">{s.xCor}</td>
                    <td className="p-2 border border-gray-300 text-center text-gray-400 text-xs">{s.hxCor}</td>
                    <td className="p-2 border border-gray-300 text-center text-gray-400 text-xs">{s.daAdj || '-'}</td>
                    <td className="p-2 border border-gray-300 text-center text-gray-400 text-xs">{s.ddAdj || '-'}</td>
                    <td className="p-2 border border-gray-300 text-center text-gray-400 text-xs">{s.dcAdj || '-'}</td>
                    <td className="p-2 border border-gray-300 text-center text-gray-400 text-xs">{s.inpAdj || '-'}</td>
                    <td className={`p-2 border border-gray-300 text-center font-bold ${isHigh ? 'text-red-700' : isSignificant ? 'text-orange-600' : 'text-gray-700'}`}>
                      {s.final}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 text-xs text-gray-500 border-t pt-4">
          <p>* BR scores of 75-84 indicate the presence of a trait/disorder.</p>
          <p>* BR scores of 85+ indicate the prominence of a trait/disorder.</p>
        </div>
      </div>
    </div>
  );
};

export default McmiReportView;
