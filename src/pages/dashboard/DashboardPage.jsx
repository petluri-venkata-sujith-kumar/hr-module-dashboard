import "./Dashboardpage.css";
import { FaRegIdCard } from "react-icons/fa";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { SlLocationPin } from "react-icons/sl";
import { BiCategory } from "react-icons/bi";
import { useUser } from "../../context/UserContext";

const DashboardPage = () => {
  const { userData } = useUser();

  const getGreeting = () => {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      return "☀️ Good Morning";
    } else if (currentTime >= 12 && currentTime < 17) {
      return "🕑 Good Afternoon";
    } else if (currentTime >= 17 && currentTime < 20) {
      return "🌆 Good Evening";
    } else {
      return "💤 Good Night";
    }
  };
  return (
    <>
      <div className="greet-section">
        <h2>
          {getGreeting()}, {userData?.name}!
        </h2>
        <p>Let`s see how you doing...</p>
      </div>
      <section className="section-dash-container">
        <article className="article-dash-container">
          <div className="dash-left-container">
            <div className="inner-left-container">
              <ul>
                <li>
                  <span>
                    <FaRegIdCard />
                  </span>
                  <span>EmpId</span>
                  <h1>{userData?.empId}</h1>
                </li>
                <li>
                  <span>
                    <MdOutlinePhoneAndroid />
                  </span>
                  <span>Phone</span>
                  <h1>{userData?.phone}</h1>
                </li>
                <li>
                  <span>
                    <AiOutlineMail />
                  </span>
                  <span>email</span>
                  <h1>{userData?.email}</h1>
                </li>
                <li>
                  <span>
                    <BiCategory />
                  </span>
                  <span>Category</span>
                  <h1>{userData?.userCategory}</h1>
                </li>
                <li>
                  <span>
                    <SlLocationPin />
                  </span>
                  <span>Location</span>
                  <h1>{userData?.location || "Not fetched"}</h1>
                </li>
              </ul>
            </div>
          </div>
          <div className="dash-right-container">
            <div className="inner-right-container">
              <main className="upside">
                <div className="inner-upside">
                  <h1>batches</h1>
                  <div className="batch-container">
                    <div className="card">
                      <div className="circle">
                        <p>{userData?.batchs?.length}</p>
                        <h5>Total Batches</h5>
                      </div>
                      <span>assigned batches</span>
                    </div>
                    <div className="card">
                      <div className="circle">
                        <p>l</p>
                        <h5>assign</h5>
                      </div>
                      <span>assigned batches</span>
                    </div>
                    <div className="card">
                      <div className="circle">
                        <p>4</p>
                        <h5>assign</h5>
                      </div>
                      <span>assigned batches</span>
                    </div>
                    <div className="card">
                      <div className="circle">
                        <p>3</p>
                        <h5>assign</h5>
                      </div>
                      <span>assigned batches</span>
                    </div>
                  </div>
                </div>
              </main>
              <div className="downside">
                <div className="inner-downside">
                  <h1>Attendance</h1>
                  <div className="batch-container">
                    <div className="card">
                      <div className="circle">
                        <p>1</p>
                        <h5>assign</h5>
                      </div>
                      <span>assigned batches</span>
                    </div>
                    <div className="card">
                      <div className="circle">
                        <p>2</p>
                        <h5>assign</h5>
                      </div>
                      <span>assigned batches</span>
                    </div>
                    <div className="card">
                      <div className="circle">
                        <p>4</p>
                        <h5>assign</h5>
                      </div>
                      <span>assigned batches</span>
                    </div>
                    <div className="card">
                      <div className="circle">
                        <pa>3</pa>
                        <h5>assign</h5>
                      </div>
                      <span>assigned batches</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default DashboardPage;
