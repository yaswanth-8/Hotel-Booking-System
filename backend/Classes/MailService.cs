using MimeKit;

namespace backend.Classes
{
    public class MailService
    {
        public static void sendConfirmationEmail(String emailSubject, String emailMessage, String toEmail)
        {
            try
            {

                string fromPassword = "hi";
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse("yaswannthh@gmail.com"));
                email.To.Add(MailboxAddress.Parse(toEmail));
                email.Subject = emailSubject;

                email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
                {
                    Text = emailMessage,

                };

                using var smtp = new MailKit.Net.Smtp.SmtpClient();
                smtp.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);

                smtp.Authenticate("yaswannthh@gmail.com", "yicnhtxmbimbewlr");

                smtp.Send(email);
                smtp.Disconnect(true);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
