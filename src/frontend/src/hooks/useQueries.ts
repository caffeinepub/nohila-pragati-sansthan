import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { HelpRequest, QRCodeData, UserProfile } from "../backend.d";
import { useActor } from "./useActor";

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
