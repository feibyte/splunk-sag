import { CPUType, ServerType } from '../types/serverTypes';
import { generateServerOptions } from './serverUtils';

describe('generateServerOptions', () => {
  it('should return empty array when memorySize < 2048', () => {
    const result = generateServerOptions(CPUType.X86, 2047, false);
    expect(result).toEqual([]);
  });

  it('should return High Density Server when ARM CPU, >=524288MB memory and GPU accelerator', () => {
    const result = generateServerOptions(CPUType.ARM, 524288, true);
    expect(result).toEqual([ServerType.HighDesnsity]);
  });

  it('should include MainFrame when CPU is Power', () => {
    const result = generateServerOptions(CPUType.Power, 131072, false);
    expect(result).toContain(ServerType.MainFrame);
  });

  it('should return correct options for Power CPU with large memory', () => {
    const result = generateServerOptions(CPUType.Power, 131072, false);
    expect(result).toEqual(expect.arrayContaining([
      ServerType.MainFrame,
      ServerType.Rack,
      ServerType.Tower
    ]));
    expect(result).not.toContain(ServerType.HighDesnsity);
  });

  it('should return correct options for X86 CPU with medium memory', () => {
    const result = generateServerOptions(CPUType.X86, 131072, false);
    expect(result).toEqual(expect.arrayContaining([
      ServerType.Rack,
      ServerType.Tower
    ]));
    expect(result).not.toContain(ServerType.MainFrame);
    expect(result).not.toContain(ServerType.HighDesnsity);
  });
});