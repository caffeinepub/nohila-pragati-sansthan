import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface QRCodeData {
    url: string;
    description: string;
    updatedAt: bigint;
}
export interface UserProfile {
    name: string;
    role: string;
    registrationDate: bigint;
    phoneNumber: string;
}
export interface HelpRequest {
    id: bigint;
    name: string;
    submittedAt: bigint;
    message: string;
    phone: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllHelpRequests(): Promise<Array<HelpRequest>>;
    getAllMembers(): Promise<Array<[Principal, UserProfile]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getHelpRequestCount(): Promise<bigint>;
    getMemberCount(): Promise<bigint>;
    getMembersByRole(role: string): Promise<Array<[Principal, UserProfile]>>;
    getQRCodeData(): Promise<QRCodeData | null>;
    getRecentHelpRequests(limit: bigint): Promise<Array<HelpRequest>>;
    getStats(): Promise<{
        volunteerCount: bigint;
        memberCount: bigint;
        adminCount: bigint;
        totalHelpRequests: bigint;
        totalMembers: bigint;
    }>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isPhoneNumberRegistered(phoneNumber: string): Promise<boolean>;
    registerMember(name: string, phoneNumber: string, role: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setQRCodeData(url: string, description: string): Promise<void>;
    submitHelpRequest(name: string, phone: string, message: string): Promise<bigint>;
}
