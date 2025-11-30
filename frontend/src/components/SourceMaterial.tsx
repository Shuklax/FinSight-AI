import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Link, Upload } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

const SourceMaterial = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="font-bold text-xl mb-2">Source Material</h1>
        <p className="text-sm font-semibold text-gray-400">
          Choose how you want to provide the financial data
        </p>
      </div>

      <div>
        <Tabs defaultValue="pdf" className="w-full h-full">
          <TabsList className="w-full flex">
            <TabsTrigger value="pdf" className="font-semibold flex-1">
              Upload PDF
            </TabsTrigger>
            <TabsTrigger value="url-text" className="font-semibold flex-1">
              URL / Text
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pdf" className="mt-2">
            <div className="flex flex-col justify-center items-center border-dashed border-2 border-slate-300 hover:border-slate-500 rounded-xl p-4 mt-4 w-full">
              <div className="flex justify-center items-center bg-slate-300 rounded-full p-4 mb-4">
                <Upload className="w-8 h-8 text-black" />
              </div>
              <div className="flex flex-col text-center mt-4 space-y-2 mb-4">
                <p className="font-semibold text-xl">
                  Drag & drop your PDF here
                </p>
                <p className="font-semibold text-sm text-gray-500">
                  or click to browse files
                </p>
              </div>
              <button className="border-2 p-2 rounded-xl m-3">
                Select File
              </button>
            </div>
          </TabsContent>

          <TabsContent value="url-text">
            <div className="mt-4">
              <p className="font-semibold mb-2">Document URL</p>
              <InputGroup>
                <InputGroupInput placeholder="https://investors.company.com/report.pdf" />
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
              <Label className="font-semibold" htmlFor="raw-text">Raw Text</Label>
              <Textarea className="h-full resize-none" placeholder="Type your message here." id="raw-text"/>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default SourceMaterial;
