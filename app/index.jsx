import { Redirect } from 'expo-router';

export default function Index() {
    // For now, redirect to login. In a real app, we'd check auth state.
    return <Redirect href="/(auth)/login" />;
}
