import React, { useState } from 'react';
import { Player, GamePhase, Role, Screen } from './types';
import SetupScreen from './components/SetupScreen';
import RoleSelectionScreen from './components/RoleSelectionScreen';
import TutorialScreen from './components/TutorialScreen';
import LocalGameContainer from './components/LocalGameContainer';
import MainMenuScreen from './components/MainMenuScreen';
import OnlineGameContainer from './components/OnlineGameContainer';
import WelcomeScreen from './components/WelcomeScreen';


const App: React.FC = () => {
    const [screen, setScreen] = useState<Screen>('welcome');
    const [localGamePlayers, setLocalGamePlayers] = useState<string[]>([]);
    
    const handleStartApp = () => {
        setScreen('main-menu');
    };

    const handleSelectMode = (mode: 'local' | 'online') => {
        if (mode === 'local') {
            setScreen('setup');
        } else {
            setScreen('online-lobby');
        }
    };

    const handleGoToRoleSelect = (playerNames: string[]) => {
        setLocalGamePlayers(playerNames);
        setScreen('roles');
    };
    
    const handleBackToMainMenu = () => {
        setScreen('main-menu');
    };

    const handleBackToSetup = () => {
        setScreen('setup');
    };
    
    const handleGoToTutorial = () => {
        setScreen('tutorial');
    };

    const handleGoToHome = () => {
        setScreen('main-menu');
        setLocalGamePlayers([]);
    };

    switch (screen) {
        case 'welcome':
            return <WelcomeScreen onStart={handleStartApp} />;

        case 'main-menu':
            return <MainMenuScreen onSelectMode={handleSelectMode} onTutorial={handleGoToTutorial} />;
        
        case 'online-lobby':
            return <OnlineGameContainer onGoToHome={handleGoToHome} />;

        case 'setup':
            return <SetupScreen onContinue={handleGoToRoleSelect} initialPlayers={localGamePlayers} onBack={handleBackToMainMenu}/>;

        case 'tutorial':
            return <TutorialScreen onBack={handleBackToMainMenu} />;
        
        case 'roles':
            return <RoleSelectionScreen 
                        playerCount={localGamePlayers.length} 
                        onStartGame={(roles) => setScreen('game')}
                        onBack={handleBackToSetup}
                    />;
        case 'game':
             return <LocalGameContainer 
                        playerNames={localGamePlayers}
                        onGoToHome={handleGoToHome} 
                    />;

        default:
             return <WelcomeScreen onStart={handleStartApp} />;
    }
};

export default App;