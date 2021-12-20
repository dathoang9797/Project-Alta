import React, { useState } from "react";
import MainTitleComponent from "@shared/components/MainTitleComponent";
import { IModal } from "./interface";
import { useAltaIntl } from "@shared/hook/useTranslate";



const Home = () => {
  // useState và useEffect nên đặt ở đầu  
  const [modal, setModal] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
  });
  const { formatMessage } = useAltaIntl();
  
  return (
    <div className='home'>
      {"HOME"}
    </div>
  );
};

export default React.memo(Home);

