export const verificationEmail = (username: string, code: string, id: number) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.05);
                overflow: hidden;
            }
            .email-header {
                background-color: #ebe9e6;
                padding: 20px;
                color: #333;
                text-align: center;
            }
            .email-header img {
                max-width: 120px;
            }
            .email-body {
                padding: 30px;
            }
            .email-body h2 {
                color: #333;
                margin-bottom: 20px;
            }
            .email-body p {
                color: #666;
                line-height: 1.6;
            }
            .verify-button {
                display: block;
                width: 200px;
                margin: 30px auto;
                padding: 12px 0;
                text-align: center;
                background-color: #000;
                color: #fff !important;
                text-decoration: none;
                border-radius: 5px;
                font-size: 18px;
            }
            .verify-button:hover {
                background-color: #fd7c18;
            }
            .email-footer {
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #999;
            }
            </style>
        </head>
        <body>
            <div class="email-container">
            <!-- Header Section -->
            <div class="email-header">
                <img src="${process.env.BASE_URL}/api/logo" alt="Company Logo">
            </div>
            
            <!-- Body Section -->
            <div class="email-body">
                <h2>Welcome to ENIGMA EVENTS!</h2>
                <p>Hello ${username},</p>
                <p>Thank you for creating an account with us. To complete your registration, please verify your email by clicking the button below:</p>
                
                <!-- Verification Button -->
                <a href="${process.env.BASE_URL}/api/user/verify/${id}?token=${code}" class="verify-button">Verify Email</a>
                
                <p>If you did not create this account, please disregard this email.</p>
            </div>

            <!-- Footer Section -->
            <div class="email-footer">
                <p>&copy; 2024 HITSMF 0.2. All rights reserved.</p>
                <p>If you have any questions, contact us at sudarshanamadu299@gmail.com</p>
            </div>
            </div>
        </body>
        </html>

    `;
}

export const paymentVerificationEmail = (username: string) => {
    return `
    
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Approved - Collect Your Ticket</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f7;
            margin: 0;
            padding: 0;
			width:100%;
			height:100%;
        }

        .container {
            width: 100%;
            background-color: #f4f4f7;
            padding: 20px;
            display: flex;
			flex-direction:row;
            justify-content: center;
            align-items: center;
        }

        .email-wrapper {
            width: 100%;
            max-width: 600px;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            background-color: #a2a2a2;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }

        .email-body {
            padding: 20px;
        }

        .email-body h2 {
            color: #333333;
            font-size: 20px;
            margin-bottom: 10px;
        }

        .email-body p {
            color: #555555;
            font-size: 16px;
            line-height: 1.6;
        }

        .email-body .button {
            display: inline-block;
			margin-left:auto;
			margin-right:auto;
            padding: 12px 25px;
            font-size: 16px;
            color: #ffffff;
            background-color: #fd7c18;
            border-radius: 4px;
            text-decoration: none;
            margin-top: 20px;
        }

        .email-footer {
            background-color: #f4f4f7;
            text-align: center;
            padding: 20px;
            color: #888888;
            font-size: 12px;
        }

        .email-footer a {
            color: #fd7c18;
            text-decoration: none;
        }

        @media (max-width: 600px) {
            .email-wrapper {
                width: 100%;
                border-radius: 0;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="email-wrapper">
            <!-- Email Header -->
            <div class="email-header">
				<img src="https://hitsmf.besthub.me/api/logo" width="50px" height="50px"/>
                <h1>Enigma - Payment Approved</h1>
            </div>

            <!-- Email Body -->
            <div class="email-body">
                <h2>Dear ${username},</h2>
                <p>We are pleased to inform you that your payment for the event has been successfully approved. You can now collect your ticket from the <strong>My Tickets</strong> section in your Enigma account.</p>

                <p>Please use the link below to log in and access your tickets:</p>

                <!-- Call to Action Button -->
                <a href="https://hitsmf.besthub.me/mytickets" class="button">Go to My Tickets</a>

                <p>If you have any questions or need further assistance, feel free to contact our support team.</p>

                <p>Thank you for choosing HITSMF!</p>
            </div>

            <!-- Email Footer -->
            <div class="email-footer">
                <p>© 2024 HITSMF 0.2 | <a href="https://hitsmf.besthub.me">HITSMF 0.2</a></p>
                <p>If you didn’t make this payment, please contact us immediately at <a href="mailto:sudarshanamadu299@gmail.com">sudarshanamadu299@gmail.com</a></p>
            </div>
        </div>
    </div>
</body>

</html>

    
    `;
}

export const AdminPaymentNotification= (
    paymentApprovalLink: string
  ): string => {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        
          <table width="100%" cellspacing="0" cellpadding="10" border="0" style="background-color: #f7f7f7;">
            <tr>
              <td>
                <table width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
                  <tr>
                    <td style="padding: 20px; background-color: #989a9d; color: #ffffff; text-align: center;">
                        <img src="https://hitsmf.besthub.me/api/logo" alt="HITS Logo" width="100" height="100">
                      <h1>New Payment Pending Approval</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px;">
                      <p>Hello Admin,</p>
                      <p>There is a new payment that requires your approval. Please review the payment details by visiting the link below:</p>
                      <p style="text-align: center;">
                        <a href="${paymentApprovalLink}" style="background-color: #fd7c18; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                          Approve Payment
                        </a>
                      </p>
                      <p>Thank you for your attention!</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px; text-align: center; background-color: #f7f7f7;">
                      <p>&copy; 2024 PASINDU RUSH  All rights reserved.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
  };
  

  