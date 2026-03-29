import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  HelpRequest,
  PendingRegistration,
  QRCodeData,
  UserProfile,
} from "../backend";
import { createActorWithConfig } from "../config";
import { useActor } from "./useActor";

export type { PendingRegistration };

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useGetStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetQRCodeData() {
  const { actor, isFetching } = useActor();
  return useQuery<QRCodeData | null>({
    queryKey: ["qrCodeData"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getQRCodeData();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      phoneNumber,
      role,
    }: { name: string; phoneNumber: string; role: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.registerMember(name, phoneNumber, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useSubmitHelpRequest() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      phone,
      message,
    }: { name: string; phone: string; message: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitHelpRequest(name, phone, message);
    },
  });
}

export function useSetQRCodeData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      url,
      description,
    }: { url: string; description: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setQRCodeData(url, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qrCodeData"] });
    },
  });
}

export function useIsPhoneRegistered(phoneNumber: string) {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isPhoneRegistered", phoneNumber],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isPhoneNumberRegistered(phoneNumber);
    },
    enabled: !!actor && !isFetching && phoneNumber.length >= 10,
  });
}

export function useGetAllHelpRequests() {
  const { actor, isFetching } = useActor();
  return useQuery<HelpRequest[]>({
    queryKey: ["allHelpRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllHelpRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllMembers() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<[unknown, UserProfile]>>({
    queryKey: ["allMembers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMembers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitPendingRegistration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      phoneNumber,
      role,
      utrNumber,
    }: {
      name: string;
      phoneNumber: string;
      role: string;
      utrNumber: string;
    }) => {
      const resolvedActor = actor ?? (await createActorWithConfig());
      return resolvedActor.submitPendingRegistration(
        name,
        phoneNumber,
        role,
        utrNumber,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPendingRegistration"] });
    },
  });
}

export function useGetMyPendingRegistration() {
  const { actor, isFetching } = useActor();
  return useQuery<PendingRegistration | null>({
    queryKey: ["myPendingRegistration"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyPendingRegistration();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllPendingRegistrations() {
  const { actor, isFetching } = useActor();
  return useQuery<PendingRegistration[]>({
    queryKey: ["allPendingRegistrations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPendingRegistrations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useApprovePendingRegistration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (utrNumber: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.approvePendingRegistration(utrNumber);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPendingRegistrations"] });
      queryClient.invalidateQueries({ queryKey: ["allMembers"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["occupiedSpecialRoles"] });
    },
  });
}

export function useRejectPendingRegistration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (utrNumber: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.rejectPendingRegistration(utrNumber);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPendingRegistrations"] });
    },
  });
}

export function useGetOccupiedSpecialRoles() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["occupiedSpecialRoles"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getOccupiedSpecialRoles();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useClearAllData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).clearAllData();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allMembers"] });
      queryClient.invalidateQueries({ queryKey: ["allPendingRegistrations"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["occupiedSpecialRoles"] });
    },
  });
}
