import React from 'react';
import ButtonAppBar from "./layout/Appbar"
import MaterialTableDemo from "./layout/table"
import FloatingActionButtons from "./layout/utils"

function App() {
    return (
        <div>
            <ButtonAppBar />
            <FloatingActionButtons/>
            <MaterialTableDemo/>
        </div>
    );
}

export default App;
