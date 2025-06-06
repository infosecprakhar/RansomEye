// src/app/actions.ts
"use server";

import { analyzeRansomwareBehavior, type AnalyzeRansomwareBehaviorOutput } from "@/ai/flows/analyze-ransomware-behavior";

export interface AnalysisData {
  logs: {
    fileSystemLogs: string;
    registryLogs: string;
    networkLogs: string;
  };
  analysis: AnalyzeRansomwareBehaviorOutput | null;
  error?: string;
}

// Mock log generation
const generateMockFileSystemLogs = (): string => `
[+] File Created: C:\\Users\\Victim\\Documents\\encrypted_file1.txt.locked
[+] File Created: C:\\Users\\Victim\\Desktop\\ransom_note.html
[+] File Modified: C:\\Windows\\System32\\important_config.dll (attribute change: hidden)
[+] File Deleted: C:\\Users\\Victim\\Photos\\backup_photo.jpg
[*] Scan complete. 1500 files encrypted in C:\\Users\\Victim\\Documents.
`;

const generateMockRegistryLogs = (): string => `
[*] Registry Key Added: HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\\RansomwareLauncher
    Value: C:\\ProgramData\\malware.exe
[*] Registry Value Modified: HKCU\\Software\\SecureApp\\LicenseKey
    Old Value: VALID_KEY_XYZ
    New Value: EXPIRED_CONTACT_SUPPORT
[*] Registry Key Accessed: HKCU\\Control Panel\\Desktop\\Wallpaper
    Action: Read
[*] Attempted to disable Task Manager: HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\DisableTaskMgr set to 1
`;

const generateMockNetworkLogs = (): string => `
[*] TCP Connection Established: Local 192.168.1.10:54321 -> Remote 123.45.67.89:443 (Command & Control Server)
[*] Data Sent: 512 KB to 123.45.67.89 (Potential exfiltration or key exchange)
[*] DNS Query: evil-domain.com -> Resolved to 10.20.30.40
[*] HTTP POST Request: http://evil-domain.com/checkin
    User-Agent: MalwareClient/1.0
    Body: { "id": "victim_xyz", "status": "infected" }
[*] UDP Traffic Detected: Port 6881 (BitTorrent activity, possible payload download)
`;


export async function handleAnalyzeSampleAction(): Promise<AnalysisData> {
  try {
    const fileSystemLogs = generateMockFileSystemLogs();
    const registryLogs = generateMockRegistryLogs();
    const networkLogs = generateMockNetworkLogs();

    const analysisResult = await analyzeRansomwareBehavior({
      fileSystemLogs,
      registryLogs,
      networkLogs,
    });

    return {
      logs: { fileSystemLogs, registryLogs, networkLogs },
      analysis: analysisResult,
    };
  } catch (error) {
    console.error("Error during analysis:", error);
    return {
      logs: { // Return generated logs even if AI analysis fails
        fileSystemLogs: generateMockFileSystemLogs(),
        registryLogs: generateMockRegistryLogs(),
        networkLogs: generateMockNetworkLogs(),
      },
      analysis: null,
      error: error instanceof Error ? error.message : "An unknown error occurred during analysis.",
    };
  }
}
