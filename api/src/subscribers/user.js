export default class UserSubscriber {
    onUserSignIn({ _id }: Partial<IUser>) {
        const Logger: Logger = Container.get('logger');

        try {
            const UserModel = Container.get('UserModel') as mongoose.Model<IUser & mongoose.Document>;

            UserModel.update({ _id }, { $set: { lastLogin: new Date() } });
        } catch (e) {
            Logger.error(`🔥 Error on event ${events.user.signIn}: %o`, e);

            // Throw the error so the process die (check src/app.ts)
            throw e;
        }
    }
}