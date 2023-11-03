First you need to clone it https://gitlab.com/Akmalov-Asror/Food-Ordering-FullStack.git
Second you must change appsetings.json 
"ConnectionStrings": {
    "DefaultConnectionStrings": "Host=localhost;Port=5432;Database=YOUR DATABASE;Username=postgres;Password=YOUR PASSWORD;"
  },
after this you must migrate and update-database next step click run 


#If you want to use in docker 
you must check docker and if it is off you need to fix it
next step you're write 
      #docker-compose build
      #docker-compose up
and docker opens new ports
