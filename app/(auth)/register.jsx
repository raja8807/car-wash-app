import { useRouter } from 'expo-router';
import { Lock, Mail, Phone, User } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Colors } from '../../constants/Colors';
import { Spacing } from '../../constants/Styles';

export default function RegisterScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        setLoading(true);
        // Simulate registration
        setTimeout(() => {
            setLoading(false);
            router.replace('/(tabs)');
        }, 1000);
    };

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to get started</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Full Name"
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}
                        leftIcon={<User size={20} color={Colors.gray[500]} />}
                    />
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        leftIcon={<Mail size={20} color={Colors.gray[500]} />}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <Input
                        label="Phone"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChangeText={setPhone}
                        leftIcon={<Phone size={20} color={Colors.gray[500]} />}
                        keyboardType="phone-pad"
                    />
                    <Input
                        label="Password"
                        placeholder="Create a password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        leftIcon={<Lock size={20} color={Colors.gray[500]} />}
                    />

                    <Button
                        title="Sign Up"
                        onPress={handleRegister}
                        loading={loading}
                        style={styles.registerButton}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.link}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: Spacing.m,
    },
    header: {
        marginBottom: Spacing.xl,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.gray[600],
    },
    form: {
        width: '100%',
    },
    registerButton: {
        marginTop: Spacing.m,
        marginBottom: Spacing.l,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: Colors.gray[600],
        fontSize: 14,
    },
    link: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '600',
    },
});
