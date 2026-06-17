### Simple Website simulating Workforce Distribution

It does not really have any real purpose, just a fun exploration into the topic.
It is important to note, that it is not based on real Science, more so on the gut-feeling.

### What problem it explores

- Behavior of Humans is largely based on incentives
- Changing level of monetary redistribution changes incentives
- Programm simulates equilibrium Economic State with different levels of Wealth Redistribution

### Assumptions Made

- Given Population of 100: 80 Workers and 20 Management, each Pop seeks to consume up to 1 Food and 15 Services
- Workforce that each group is allowed to use is determained by the level of Monopolisation
- Food, Services and Research are produced by Workers with Efficiency, influenced by the Accumulated Research
- Research declines by time, so maintaining higher level of Productivity requires more and more Investment to Maintain
- Management (company owners) tends to Invest high level of their Excess Income
- Workers tend to Focus more on consuming initially, but start Investing more when reaching Middle Class
- If Either category of People can just reach maximum Standart of Living (1 Food + 15 Services), they do not have incentive to continue Investing at all
- Increasing level of Monopolisation increases People's will to invest (as profitability of a company rises)
- Decreasing level of Monopolisation vice-versa decreases People's will to invest (as companies do not recieve profits)
- Military (that does nothing in that simulation) simulates Supporting Non-Productive jobs

### How to run

That is a very simple Website, without server side beyound serving static files.

1. Copy the repository
2. Go to `./app/web`, create `.env` and `.docker.env` and fill them according to provided `.env.example`
3. Go back to root folder, run `docker compose up --build`
4. Go to the port you designated the thing to run on
5. If you want to run dev build locally - do what is there in `./app/web/Dockerfile`
