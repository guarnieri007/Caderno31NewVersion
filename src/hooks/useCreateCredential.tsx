import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CreateNewCredentialProps } from '../interfaces';

export function useCreateCredential() {
    const { createCredential } = useAuth();
    const [loadingCreateCredential, setLoadingCreateCredential] = useState(false);
    const [errorCreateCredential, setErrorCreateCredential] = useState<string | null>(null);
    const [successCreateCredential, setSuccessCreateCredential] = useState(false);

    async function handleCreateCredential(data: CreateNewCredentialProps) {
        setLoadingCreateCredential(true);
        try {
            await createCredential(data);
            setSuccessCreateCredential(true);
        } catch (err) {
            setErrorCreateCredential(`Erro ao criar Credential: ${err}`);
            throw new Error(`Erro ao criar Credential: ${err}`);
            
        } finally {
            setLoadingCreateCredential(false);
        }
    }

    return { handleCreateCredential, loadingCreateCredential, errorCreateCredential, successCreateCredential };
}