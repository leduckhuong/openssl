const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

class CA{
    index(req, res) {
        res.render('index', {
            isCA: true
        })
    }
    async ca(req, res) {
        try {
            const domain = req.body.domain;
            const organization = req.body.organization;
            const country = req.body.country;
            const email = req.body.email;
            const caCertificatePath = 'D:/studyings/CA/openssl/src/certificates/ca-certificate.pem';
            const caKeyPath = 'D:/studyings/CA/openssl/src/certificates/ca-key.pem';
            // Tạo một tên file duy nhất cho chứng thực/key
            const certificateFileName = `${domain}.pem`;
        
            // Sử dụng OpenSSL để tạo cặp chứng thực/key
            exec(`openssl genpkey -algorithm RSA -out D:/studyings/CA/openssl/src/publics/certificates/${certificateFileName}`, (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Lỗi trong quá trình tạo chứng thực.');
                    return;
                }
        
                // Tạo Certificate Signing Request (CSR)
                exec(`openssl req -new -key D:/studyings/CA/openssl/src/publics/certificates/${certificateFileName} -out D:/studyings/CA/openssl/src/publics/certificates/${certificateFileName}.csr -subj "/CN=${domain}/O=${organization}/C=${country}/emailAddress=${email}"`, (error) => {
                    if (error) {
                        console.error(error);
                        res.status(500).send('Lỗi trong quá trình tạo CSR.');
                        return;
                    }
            
                    // Ký CSR bằng CA Certificate và Key để tạo chứng thực
                    exec(`openssl x509 -req -in D:/studyings/CA/openssl/src/publics/certificates/${certificateFileName}.csr -CA ${caCertificatePath} -CAkey ${caKeyPath} -out D:/studyings/CA/openssl/src/publics/certificates/${certificateFileName}`, (error) => {
                        if (error) {
                            console.error(error);
                            res.status(500).send('Lỗi trong quá trình ký chứng thực.');
                            return;
                        }
            
                        // Đọc chứng thực đã tạo và gửi về cho client
                        const certificateData = fs.readFileSync('D:/studyings/CA/openssl/src/publics/certificates/'+certificateFileName, 'utf-8');
                        res.cookie('ca-key', `${certificateFileName}`)
                        .redirect('/');
                    });
                });
            });
        } catch (error) {
          console.error(error);
          res.status(500).send('Lỗi trong quá trình xử lý yêu cầu.');
        }
    }
}

module.exports = new CA()