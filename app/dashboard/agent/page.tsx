'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AnimatedButton } from '@/components/ui/button';
import { Bot, Settings, Mic, Globe, Zap, CheckCircle, Activity, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Define interfaces to match stt.json structure
interface Language {
  name: string;
  value: string;
}

interface Model {
  name: string;
  value: string;
  languages: Language[];
}

interface Provider {
  name: string;
  value: string;
  models: Model[];
}

interface STTData {
  stt: Provider[]; // This matches the top-level 'stt' array in your JSON
}

export default function AgentPage() {
  const [sttData, setSttData] = useState<STTData | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [sttConfigId, setSttConfigId] = useState<string | null>(null); // New state for existing config ID
  const [isSaving, setIsSaving] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Wait for session to load
    if (!session) {
      router.push('/auth/signin'); // Redirect to login if not authenticated
      return;
    }
    loadSTTData();
    fetchSTTConfig(); // Fetch existing STT config
  }, [session, status, router]);

  const fetchSTTConfig = async () => {
    try {
      const response = await fetch('/api/stt-config');
      if (response.ok) {
        const config = await response.json();
        if (config) {
          setSttConfigId(config.id);
          setSelectedProvider(config.provider);
          setSelectedModel(config.model);
          setSelectedLanguage(config.language);
          toast.success('Loaded existing STT configuration.');
        }
      } else {
        console.error('Failed to fetch STT configuration:', response.statusText);
        // It's okay if no config exists, just don't set an error toast for 404
      }
    } catch (error) {
      console.error('Error fetching STT configuration:', error);
      toast.error('Failed to fetch existing configuration');
    }
  };

  const handleSaveConfig = async () => {
    if (!selectedProvider || !selectedModel || !selectedLanguage) {
      toast.error('Please select a provider, model, and language.');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/stt-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: selectedProvider,
          model: selectedModel,
          language: selectedLanguage,
        }),
      });

      if (response.ok) {
        const savedConfig = await response.json();
        setSttConfigId(savedConfig.id);
        toast.success('STT configuration saved successfully!');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to save configuration: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error saving STT configuration:', error);
      toast.error('An unexpected error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const loadSTTData = async () => {
    try {
      const response = await fetch('/stt.json');
      const jsonData = await response.json();
      setSttData(jsonData);
      
      // Removed automatic initial selection logic. 
      // Selections will now only be made if an existing config is loaded from the database via fetchSTTConfig.

    } catch (error) {
      console.error('Error loading STT data:', error);
      toast.error('Failed to load configuration data');
    } finally {
      setLoading(false);
    }
  };

  const handleProviderChange = (providerValue: string) => {
    setSelectedProvider(providerValue);
    setSelectedModel('');
    setSelectedLanguage('');
    
    // Auto-select first model for the new provider if available
    const selectedProviderObj = sttData?.stt?.find((p: Provider) => p.value === providerValue);
    const modelsArray = selectedProviderObj?.models || [];
    if (modelsArray.length > 0) {
      setSelectedModel(modelsArray[0].value);
      const languagesArray = modelsArray[0].languages || [];
      if (languagesArray.length > 0) {
        setSelectedLanguage(languagesArray[0].value);
      }
    }
  };

  const handleModelChange = (modelValue: string) => {
    setSelectedModel(modelValue);
    setSelectedLanguage('');
    
    // Auto-select first language for the new model if available
    const selectedProviderObj = sttData?.stt?.find((p: Provider) => p.value === selectedProvider);
    const modelsArray = selectedProviderObj?.models || [];
    const selectedModelObj = modelsArray.find((m: Model) => m.value === modelValue);
    const languagesArray = selectedModelObj?.languages || [];
    if (languagesArray.length > 0) {
      setSelectedLanguage(languagesArray[0].value);
    }
  };

  const getAvailableModels = () => {
    const selectedProviderObj = sttData?.stt?.find((p: Provider) => p.value === selectedProvider);
    return selectedProviderObj?.models || [];
  };

  const getAvailableLanguages = () => {
    const selectedProviderObj = sttData?.stt?.find((p: Provider) => p.value === selectedProvider);
    const selectedModelObj = selectedProviderObj?.models?.find((m: Model) => m.value === selectedModel);
    return selectedModelObj?.languages || [];
  };

  const getSelectedData = () => {
    if (!sttData || !selectedProvider || !selectedModel || !selectedLanguage) {
      return null;
    }

    const provider = sttData.stt.find((p: Provider) => p.value === selectedProvider);
    const model = provider?.models.find((m: Model) => m.value === selectedModel);
    const language = model?.languages.find((l: Language) => l.value === selectedLanguage);

    if (!provider || !model || !language) {
      return null;
    }
    
    return {
      provider: {
        id: provider.value,
        name: provider.name,
      },
      model: {
        id: model.value,
        name: model.name,
      },
      language: {
        id: language.value,
        name: language.name,
      },
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
          <p className="text-gray-400 text-lg">Loading agent configuration...</p>
        </div>
      </div>
    );
  }

  const selectedData = getSelectedData();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 orange-gradient rounded-2xl flex items-center justify-center glow-orange-sm">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Agent Configuration</h1>
            <p className="text-gray-400 text-lg">
              Configure your voice AI agent's speech-to-text settings
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Configuration Card */}
        <div className="xl:col-span-2">
          <Card className="bg-black/20 backdrop-blur-xl border-white/10 shadow-2xl">
            <CardHeader className="pb-8">
              <CardTitle className="text-white flex items-center space-x-3 text-2xl">
                <Settings className="h-7 w-7 text-orange-500" />
                <span>STT Configuration</span>
              </CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                Select your speech-to-text provider, model, and language preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Provider Selection */}
              <div className="space-y-4">
                <Label className="text-white flex items-center space-x-3 text-lg font-semibold">
                  <Bot className="h-5 w-5 text-gray-400" />
                  <span>Provider</span>
                </Label>
                <Select value={selectedProvider} onValueChange={handleProviderChange}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-14 text-lg rounded-xl">
                    <SelectValue placeholder="Select a provider" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10 backdrop-blur-xl">
                    {sttData?.stt?.map((provider) => (
                      <SelectItem 
                        key={provider.value} 
                        value={provider.value}
                        className="text-white hover:bg-white/10 text-lg"
                      >
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Model Selection */}
              <div className="space-y-4">
                <Label className="text-white flex items-center space-x-3 text-lg font-semibold">
                  <Mic className="h-5 w-5 text-gray-400" />
                  <span>Model</span>
                </Label>
                <Select value={selectedModel} onValueChange={handleModelChange} disabled={!selectedProvider}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-14 text-lg rounded-xl">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10 backdrop-blur-xl">
                    {getAvailableModels().map((model) => (
                      <SelectItem key={model.value} value={model.value} className="text-white hover:bg-white/10 text-lg">
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Language Selection */}
              <div className="space-y-4">
                <Label className="text-white flex items-center space-x-3 text-lg font-semibold">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <span>Language</span>
                </Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage} disabled={!selectedModel}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-14 text-lg rounded-xl">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10 backdrop-blur-xl">
                    {getAvailableLanguages().map((language) => (
                      <SelectItem key={language.value} value={language.value} className="text-white hover:bg-white/10 text-lg">
                        {language.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <div className="flex justify-end p-6 pt-0">
              <AnimatedButton
                onClick={handleSaveConfig}
                disabled={isSaving || !selectedProvider || !selectedModel || !selectedLanguage}
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl text-lg transition duration-300 ease-in-out"
              >
                {isSaving ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : null}
                {sttConfigId ? 'Update Configuration' : 'Save Configuration'}
              </AnimatedButton>
            </div>
          </Card>
        </div>

        {/* Summary and Status Cards */}
        <div className="space-y-6">
          {/* Configuration Summary */}
          <Card className="bg-black/20 backdrop-blur-xl border-white/10 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Activity className="h-5 w-5 text-orange-500" />
                <span>Configuration</span>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Current agent setup
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedData ? (
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <span className="text-gray-300 md:flex-shrink-0">Provider:</span>
                      <span className="font-medium text-white text-right break-words">{selectedData.provider.name}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <span className="text-gray-300 md:flex-shrink-0">Model:</span>
                      <span className="font-medium text-white text-right break-words">{selectedData.model.name}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <span className="text-gray-300 md:flex-shrink-0">Language:</span>
                      <span className="font-medium text-white text-right break-words">{selectedData.language.name}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20 text-green-400 font-medium flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Agent configured successfully!</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-gray-400 text-center">
                  <p>No configuration selected yet.</p>
                  <p className="text-sm mt-2">Please select a provider, model, and language.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}