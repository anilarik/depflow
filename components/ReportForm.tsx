
import React, { useState } from 'react';
import { Visibility } from '../types';

interface ReportFormProps {
  taskId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ taskId, onCancel, onSuccess }) => {
  const [description, setDescription] = useState('');
  const [sharedLink, setSharedLink] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.HOD_ONLY);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call and storage upload
    setTimeout(() => {
      console.log('Report Submitted:', { taskId, description, sharedLink, visibility, filesCount: files.length });
      setIsSubmitting(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-slate-900 p-8 text-white">
          <h2 className="text-2xl font-bold">Submit Work Report</h2>
          <p className="text-slate-400 mt-1 text-sm">Update your task progress and attach relevant files.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Description of Work Done</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none min-h-[120px]"
              placeholder="What have you achieved?"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Shared Folder Location (Link)</label>
            <input
              type="url"
              value={sharedLink}
              onChange={(e) => setSharedLink(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              placeholder="Google Drive, Dropbox, or OneDrive link..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Attachments (Images/PDFs)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-blue-400 transition-colors">
              <div className="space-y-1 text-center">
                <span className="text-3xl mb-2 block">📎</span>
                <div className="flex text-sm text-slate-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Upload a file</span>
                    <input type="file" multiple className="sr-only" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-slate-500">PNG, JPG, PDF up to 10MB</p>
                {files.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2 justify-center">
                    {files.map((f, i) => (
                      <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                        {f.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <p className="text-sm font-bold text-slate-800">Privacy Toggle</p>
              <p className="text-xs text-slate-500">Who can view this report?</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-bold ${visibility === Visibility.HOD_ONLY ? 'text-blue-600' : 'text-slate-400'}`}>HOD Only</span>
              <button
                type="button"
                onClick={() => setVisibility(prev => prev === Visibility.HOD_ONLY ? Visibility.PUBLIC : Visibility.HOD_ONLY)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  visibility === Visibility.PUBLIC ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  visibility === Visibility.PUBLIC ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
              <span className={`text-xs font-bold ${visibility === Visibility.PUBLIC ? 'text-blue-600' : 'text-slate-400'}`}>Public</span>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700 active:scale-95'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Confirm Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
