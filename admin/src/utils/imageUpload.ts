

export const ImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => { 
    const file= e?.target?.files?.[0]
    
    if (file) {
        const base64 = await convertToBase64(file) 
        return base64;
        
    } else {
       throw new Error("couldn't upload the image try again") 
    }
}

export const convertToBase64 =  (file:any) => { 
    return new Promise((resolve, reject) => { 
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => { 
            resolve(fileReader.result )
         }
        
        fileReader.onerror = (error) => { 
            reject(error)
         }
     })
 }
