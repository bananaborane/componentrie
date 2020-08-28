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
            userId: 'fdsa'
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