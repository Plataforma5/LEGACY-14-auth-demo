module.exports = {
  index: (user = {}) => `
    <div>
      <a href="/"><h1>Cafeparatodos - ${user.email}</h1></a>
      <a href="/login"><div>LOGIN</div></a>
      <a href="/register"><div>REGISTER</div></a>
      <form method="POST" action="/logout">
        <button>LogOut</button>
      </form>
    </div>
  `,
  login: `
    <div>
      <a href="/"><h1>Cafeparatodos</h1></a>
      <a href="/login"><strong>LOGIN</strong></a>
      <a href="/register">REGISTER</a>

      <div>
        <form method="POST" action="/login">
          <input placeholder="Email" name="email" />
          <input placeholder="Password" name="password" />
          <button>SUBMIT</button> 
        </form>
      </div> 
    </div>
  `,
  register: `
    <div>
      <a href="/"><h1>Cafeparatodos</h1></a>
      <a href="/login">LOGIN</a>
      <a href="/register"><strong>REGISTER</strong></a>

      <div>
        <form method="POST" action="/users">
          <input placeholder="Email" name="email" />
          <input placeholder="Password" name="password" />  
          <button>SUBMIT</button>
        </form>
      </div> 
    </div>
  `,
  private: `
    <div>
      <a href="/"><h1>Cafeparatodos</h1></a>
      <a href="/login"><strong>LOGIN</strong></a>
      <a href="/register">REGISTER</a>

      <h3>Private Route</h3> 
    </div>
  `,
  public: `
    <div>
      <a href="/"><h1>Cafeparatodos</h1></a>
      <a href="/login"><strong>LOGIN</strong></a>
      <a href="/register">REGISTER</a>

      <h3>Public route</h3>
    </div>
  `,
  basic: `
  <div>
    <h1>Basic Authentication OK</h1>
  </div>`,
  logout: `
    <div>
    <form method="POST" action="/logout">
      <button>LogOut</button>
    </form>
    </div>
  `
}