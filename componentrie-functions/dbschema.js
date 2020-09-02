let db = {
    users: [
        {
            userId: 'userId',
            email: 'user@email.com',
            handle: 'userhandle',
            imageUrl: 'aflksdjg.png',
            bio: 'hello this is my bio',
            location: 'Newark, NJ'
        }
    ],
    listings: [
        {
            userHandle: 'user',
            body: 'this is the body', 
            createdAt: 'new date here'
        }, 
        { 

        }
    ],
    inquiries: [
        {
            inquiryId: '123',
            listingId: 'asdf',
            listerId: 'asdf',
            userId: 'fdsa',
            createdAt: '2019-11-03T22:30:11.492Z'
        }
    ],
    messages: [
        {
            messageId: 'asdfjklasdf',
            inquiryId: '123',
            listingId: 'asdf',
            listerId: 'asdf',
            userId: 'fdsa',
            createdAt: '2019-11-03T22:30:11.492Z'

        }, 
        {

        }
    ],
    notifications: [
        {
            recipient: 'user',
            sender: 'john',
            read: 'true | false',
            listingId: 'aasdfasdf',
            type: 'watch | message',
            createdAt: 'askdjghsdfklghjsdlf'
        }
    ]
}