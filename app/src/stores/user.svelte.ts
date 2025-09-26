import type { Session, User } from "better-auth";

class UserStore {
  user = $state<User | null>(null);
  session = $state<Session | null>(null);

  setUser(user: NonNullable<User>) {
    this.user = user;
  }
  clearUser() {
    this.user = null;
  }
  getUser() {
    return this.user;
  }

  setSession(session: Session) {
    this.session = session;
  }

  clearSession() {
    this.session = null;
  }
}

let instance: UserStore | null = null;

export function getUserStore() {
  if (!instance) instance = new UserStore();
  return instance;
}
