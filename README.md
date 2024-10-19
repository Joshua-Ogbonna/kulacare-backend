```mermaid
sequenceDiagram
    participant User
    participant WebApp
    participant Backend
    participant PaymentProvider
    participant WhatsApp
    participant AI

    User->>WebApp: Fill personal & health info
    User->>WebApp: Initiate payment
    WebApp->>PaymentProvider: Process payment
    PaymentProvider-->>WebApp: Payment confirmation
    WebApp->>Backend: Create user & generate code
    Backend-->>WebApp: Return unique code
    WebApp-->>User: Display unique code

    User->>WhatsApp: Send code to AI agent
    WhatsApp->>Backend: Validate code
    Backend->>AI: Activate user session
    AI-->>WhatsApp: Welcome message
    WhatsApp-->>User: Welcome message

    loop Ongoing Interaction
        User->>WhatsApp: Send message
        WhatsApp->>Backend: Process message
        Backend->>AI: Get response
        AI-->>Backend: Return response
        Backend-->>WhatsApp: Send response
        WhatsApp-->>User: Display response
    end
```
