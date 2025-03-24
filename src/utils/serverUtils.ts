import { CPUType, ServerType } from "../types/serverTypes";


export const generateServerOptions = (cpu: CPUType, memorySize: number, hasGPUAccelerator: boolean) => {
  if (memorySize < 2048) {
    return [];
  }

  if (hasGPUAccelerator && memorySize >= 524288 && cpu === CPUType.ARM) {
    return [
      ServerType.HighDesnsity
    ]
  }

  const serverOptions = [];
  if (cpu === CPUType.Power) {
    serverOptions.push(ServerType.MainFrame);
  }
  if (memorySize >= 131072) {
    serverOptions.push(ServerType.Rack);
  }
  serverOptions.push(ServerType.Tower);

  return serverOptions;
}