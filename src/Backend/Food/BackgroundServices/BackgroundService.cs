using Microsoft.AspNetCore.Connections;
using System.Net.Mail;
using System.Text;
using Food.EmailSettings;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace Food.BackgroundServices;

public class BackgroundService
{
    private Timer _timer;

    public System.Threading.Tasks.Task StartAsync(CancellationToken cancellationToken)
    {
        _timer = new Timer(ConsumeEmailRequests, null, TimeSpan.Zero, TimeSpan.FromSeconds(5));
        return System.Threading.Tasks.Task.CompletedTask;
    }

    public System.Threading.Tasks.Task StopAsync(CancellationToken cancellationToken)
    {
        _timer?.Change(Timeout.Infinite, 0);
        _timer?.Dispose();
        return System.Threading.Tasks.Task.CompletedTask;
    }

    public void Dispose()
    {
        _timer?.Dispose();
    }

    public void ConsumeEmailRequests(object state)
    {
        var factory = new ConnectionFactory
        {
            HostName = "localhost",
            UserName = "guest",
            Password = "guest"
        };

        using (var connection = factory.CreateConnection())
        using (var channel = connection.CreateModel())
        {
            channel.QueueDeclare(queue: "email_queue", durable: false, exclusive: false, autoDelete: false, arguments: null);

            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);

                var emailRequest = JsonConvert.DeserializeObject<EmailRequest>(message);

                // Send the email
                SendEmail(emailRequest);

                Console.WriteLine("Email request processed: {0}", message);
            };

            channel.BasicConsume(queue: "email_queue", autoAck: true, consumer: consumer);

            Console.WriteLine("Press [enter] to exit.");
            Console.ReadLine();
        }
    }

    private void SendEmail(EmailRequest emailRequest)
    {
        using (var client = new SmtpClient("smtp.gmail.com"))
        {
            client.Port = 587;
            client.Credentials = new System.Net.NetworkCredential("akmalovasror0@gmail.com", "ezebzxgragnvnlco");
            client.EnableSsl = true;

            var mail = new MailMessage
            {
                From = new MailAddress("akmalovasror0@gmail.com"),
                Subject = emailRequest.Subject,
                Body = emailRequest.Message
            };

            mail.To.Add(emailRequest.ToEmail);

            client.Send(mail);
        }
    }
}