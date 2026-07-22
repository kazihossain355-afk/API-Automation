import { test, expect} from  '@playwright/test';


// page is fixture, comming from playwright
// resuest is also fixture from playwright
// we can take off below page fixture .it will give same answere . we use page in UT test.
test('Get all the student', async ({ request }) => {
    const response = await request.get('https://qa.taltektc.com/api/students',{
                            headers:{
                                'Content-Type': 'application/json',
                                'api_token': 'DevGF4sg665s4ggFddfdgdgFFrs54D87sr54afggsTTC'
                            }
                        });
    expect(response.status()).toBe(200);
    // console.log(response);only for resoponse code print in terminal 
    
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.message).toBe('Students retrieved successfully');
    
}) 