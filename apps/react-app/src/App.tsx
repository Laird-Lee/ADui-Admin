import {Excalidraw, MainMenu, WelcomeScreen} from "@excalidraw/excalidraw";

function App() {
    return (
        <>
            <div style={{height: "800px"}}>
                <Excalidraw langCode='zh-CN'>
                    <WelcomeScreen />
                    <MainMenu>
                        <MainMenu.DefaultItems.ClearCanvas/>
                        <MainMenu.DefaultItems.Export/>
                        <MainMenu.DefaultItems.SaveAsImage/>
                        <MainMenu.DefaultItems.ToggleTheme/>
                        <MainMenu.DefaultItems.ChangeCanvasBackground/>
                    </MainMenu>
                </Excalidraw>
            </div>
        </>
    )
}

export default App
