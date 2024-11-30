// Example usage in an existing component

import {useSelector} from "react-redux";
import { Chat } from "../components/chat/Chat";


export default function SomeComponent() {
    const userId = useSelector(state => state.user.id || localStorage.getItem('userId'));
    console.log(userId);
    
    const counselorId = userId=== "3" ? 2: 3; // Get counselor's ID

    return (
        <div>
            {/* Other components */}
            <Chat currentUserId={userId} otherUserId={counselorId} userType={``} />
        </div>
    );
}