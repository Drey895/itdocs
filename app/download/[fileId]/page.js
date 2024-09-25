import { downloadFile } from "@/actions/downloadFile";
import { Download } from "@/components/Download";

export default async function Page({ params }) {
  const base64String = await downloadFile(params.fileId);
  const file = await selectFile(params.fileId);

  return (
    <div>
      <Download base64String={base64String} name={file.name} />
    </div>
  );
}
