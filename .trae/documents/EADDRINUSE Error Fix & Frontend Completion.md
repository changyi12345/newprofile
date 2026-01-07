# EADDRINUSE Error ဖြေရှင်းခြင်းနှင့် Frontend အပိုင်းဆက်လက်လုပ်ဆောင်ခြင်း

Terminal တွင်တွေ့ရသော `Error: listen EADDRINUSE: address already in use :::3000` သည် Backend server နှင့် Frontend Next.js တို့ Port 3000 တွင် တိုက်မိနေသောကြောင့် ဖြစ်သည်။ ၎င်းကို ဖြေရှင်းပြီး ကျန်ရှိနေသော UI အပိုင်းများကို ဆက်လက်လုပ်ဆောင်ပါမည်။

## အဆင့် ၁ - Port Conflict ဖြေရှင်းခြင်း
1.  [.env](file:///c%3A/Users/Lenovo/Documents/portflio/.env) ဖိုင်တွင် `PORT=3000` မှ `PORT=5000` သို့ ပြောင်းလဲပါမည်။
2.  Backend server ကို restart လုပ်ပြီး Port 5000 တွင် run အောင် ပြုလုပ်ပါမည်။

## အဆင့် ၂ - Frontend Components များ အပြီးသတ်ခြင်း
1.  **Types သတ်မှတ်ခြင်း**: [client/types/index.ts](file:///c%3A/Users/Lenovo/Documents/portflio/client/types/index.ts) တွင် Data structure များ သတ်မှတ်ပါမည်။
2.  **About Section**: [client/components/About.tsx](file:///c%3A/Users/Lenovo/Documents/portflio/client/components/About.tsx) ကို ဖန်တီးပြီး Profile ပုံနှင့် Resume download ခလုတ်များ ထည့်သွင်းပါမည်။
3.  **Experience Section**: [client/components/Experience.tsx](file:///c%3A/Users/Lenovo/Documents/portflio/client/components/Experience.tsx) ကို ဖန်တီးပြီး Timeline ပုံစံဖြင့် အတွေ့အကြုံများကို ပြသပါမည်။
4.  **Integration**: [client/app/page.tsx](file:///c%3A/Users/Lenovo/Documents/portflio/client/app/page.tsx) တွင် အထက်ပါ Component များကို ထည့်သွင်းပါမည်။

ဤအစီအစဉ်ဖြင့် Server error ကို ဖြေရှင်းပြီး User လိုချင်သော UI အပိုင်းများကိုပါ တပါတည်း ပြီးစီးစေမည် ဖြစ်သည်။
