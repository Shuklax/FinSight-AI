import { useState, useRef, useCallback } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Link, Upload, FileCheck } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useSourceMaterialStore } from "../store/store";

const SourceMaterial = () => {
  const { setInputType, setInputMaterial } = useSourceMaterialStore();

  const [activeTab, setActiveTab] = useState("pdf");
  const [isDragging, setIsDragging] = useState(false);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState("");
  const [textInput, setTextInput] = useState("");

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        
        const base64 = base64String.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle PDF file selection
  const handleFileSelect = useCallback(
    async (file: File) => {
      if (file.type !== "application/pdf") {
        alert("Please select a PDF file");
        return;
      }

      try {
        const base64 = await fileToBase64(file);
        setPdfFileName(file.name);
        setInputMaterial(base64);
        setInputType("pdf");
      } catch (error) {
        console.error("Error converting file to base64:", error);
        alert("Failed to process PDF file");
      }
    },
    [setInputMaterial, setInputType]
  );

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // File input change handler
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Clear inputs when switching tabs
    if (value === "url-text") {
      setInputType("");
      setInputMaterial("");
      setPdfFileName(null);
    } else if (value === "pdf") {
      setUrlInput("");
      setTextInput("");
      setInputType("");
      setInputMaterial("");
    }
  };

  // Handle URL input change
  const handleUrlChange = (value: string) => {
    setUrlInput(value);
    if (value.trim()) {
      setInputType("url");
      setInputMaterial(value.trim());
      setTextInput(""); // Clear text input if URL is filled
    } else if (textInput.trim()) {
      setInputType("text");
      setInputMaterial(textInput.trim());
    } else {
      setInputType("");
      setInputMaterial("");
    }
  };

  // Handle text input change
  const handleTextChange = (value: string) => {
    setTextInput(value);
    if (value.trim()) {
      setInputType("text");
      setInputMaterial(value.trim());
      setUrlInput(""); // Clear URL input if text is filled
    } else if (urlInput.trim()) {
      setInputType("url");
      setInputMaterial(urlInput.trim());
    } else {
      setInputType("");
      setInputMaterial("");
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="font-bold text-xl mb-2">Source Material</h1>
        <p className="text-sm font-semibold text-gray-400">
          Choose how you want to provide the financial data
        </p>
      </div>

      <div>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full h-full"
        >
          <TabsList className="w-full flex">
            <TabsTrigger value="pdf" className="font-semibold flex-1">
              Upload PDF
            </TabsTrigger>
            <TabsTrigger value="url-text" className="font-semibold flex-1">
              URL / Text
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pdf" className="mt-2">
            <div
              className={`flex flex-col justify-center items-center border-dashed border-2 rounded-xl p-4 mt-4 w-full transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-300 hover:border-slate-500"
              }`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex justify-center items-center bg-slate-300 rounded-full p-4 mb-4">
                {pdfFileName ? (
                  <FileCheck className="w-8 h-8 text-green-600" />
                ) : (
                  <Upload className="w-8 h-8 text-black" />
                )}
              </div>
              <div className="flex flex-col text-center mt-4 space-y-2 mb-4">
                {pdfFileName ? (
                  <>
                    <p className="font-semibold text-xl text-green-600">
                      PDF Loaded
                    </p>
                    <p className="font-semibold text-sm text-gray-500">
                      {pdfFileName}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-xl">
                      Drag & drop your PDF here
                    </p>
                    <p className="font-semibold text-sm text-gray-500">
                      or click to browse files
                    </p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <button
                className="border-2 p-2 rounded-xl m-3 hover:bg-slate-100"
                onClick={() => fileInputRef.current?.click()}
              >
                {pdfFileName ? "Change File" : "Select File"}
              </button>
            </div>
          </TabsContent>

          <TabsContent value="url-text">
            <div className="mt-4">
              <p className="font-semibold mb-2">Document URL</p>
              <InputGroup>
                <InputGroupInput
                  placeholder="https://investors.company.com/report.pdf"
                  value={urlInput}
                  onChange={(e) => handleUrlChange(e.target.value)}
                />
                <InputGroupAddon>
                  <Link />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="flex items-center gap-2 my-4">
              <div className="h-px bg-gray-300 flex-1" />
              <span className="text-xs font-semibold uppercase text-gray-500">
                or paste text
              </span>
              <div className="h-px bg-gray-300 flex-1" />
            </div>

            <div className="h-32 space-y-2">
              <Label className="font-semibold" htmlFor="raw-text">
                Raw Text
              </Label>
              <Textarea
                className="h-full resize-none"
                placeholder="Type your message here."
                id="raw-text"
                value={textInput}
                onChange={(e) => handleTextChange(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default SourceMaterial;
