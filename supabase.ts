import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto'; // Required for Supabase to work in React Native

// Replace these with the actual URL and Key from your Supabase Dashboard!
const supabaseUrl = 'https://npqxaiqxzffeaimzvhvq.supabase.co';
const supabaseAnonKey = 'sb_publishable_SiuvdgGDyw4Aas4AD_A71g_oV4C74YX';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});