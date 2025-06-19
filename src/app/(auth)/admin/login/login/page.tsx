import React from 'react';
import { InputText } from 'primereact/inputtext';  // PrimeReact Input
import { Button } from 'primereact/button';        // PrimeReact Button

const LoginForm = () => {
  return (
    <div className="absolute top-0 left-[360px] w-[720px] h-[900px] bg-white rounded-none">
      <div className="absolute top-[60px] left-0 w-[480px] text-black text-[16px] leading-[26px] font-normal">
        Your gateway to technology insights.
      </div>

      <div className="absolute top-[120px] left-[328px] text-primary text-[14px] leading-[22px] font-normal">
        Sign In
      </div>

      <div className="absolute top-[158px] left-0 w-[480px]">
        <InputText 
          placeholder="Your email address" 
          className="w-full h-[44px] pl-[44px] pr-[16px] bg-neutral-200 rounded-[6px] border-0 outline-none text-black text-[16px] leading-[26px] font-normal" 
        />
      </div>

      <div className="absolute top-[208px] left-0 w-[480px]">
        <InputText 
          placeholder="Enter your password" 
          type="password" 
          className="w-full h-[44px] pl-[44px] pr-[16px] bg-neutral-200 rounded-[6px] border-0 outline-none text-black text-[16px] leading-[26px] font-normal" 
        />
      </div>

      <Button 
        label="Log In" 
        icon="pi pi-check" 
        className="absolute top-[258px] left-0 w-[480px] h-[44px] p-[16px] flex items-center justify-center bg-primary-500 text-white rounded-[10px] hover:bg-primary-550 active:bg-primary-600 disabled:opacity-40" 
      />
      
      <div className="absolute top-[320px] left-0 text-[14px] text-primary">
        Need to create an account? <a href="#" className="text-primary-500">Sign Up</a>
      </div>
    </div>
  );
};

export default LoginForm;
