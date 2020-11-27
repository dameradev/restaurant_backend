import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
  Sql,
  Decimal,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }
export { Decimal }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw, Sql }

/**
 * Prisma Client JS version: 2.11.0
 * Query Engine version: 58369335532e47bdcec77a2f1e7c1fb83a463918
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  postgresql?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'


/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: ModelName
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;
  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.restaurant`: Exposes CRUD operations for the **Restaurant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Restaurants
    * const restaurants = await prisma.restaurant.findMany()
    * ```
    */
  get restaurant(): RestaurantDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const ModelName: {
  User: 'User',
  Restaurant: 'Restaurant'
};

export declare type ModelName = (typeof ModelName)[keyof typeof ModelName]


export declare const UserDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  email: 'email',
  isAdmin: 'isAdmin',
  password: 'password'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const RestaurantDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  description: 'description',
  isActive: 'isActive'
};

export declare type RestaurantDistinctFieldEnum = (typeof RestaurantDistinctFieldEnum)[keyof typeof RestaurantDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export declare const QueryMode: {
  default: 'default',
  insensitive: 'insensitive'
};

export declare type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]



/**
 * Model User
 */

export type User = {
  id: number
  name: string | null
  email: string | null
  isAdmin: boolean | null
  password: string | null
}


export type AggregateUser = {
  count: number
  avg: UserAvgAggregateOutputType | null
  sum: UserSumAggregateOutputType | null
  min: UserMinAggregateOutputType | null
  max: UserMaxAggregateOutputType | null
}

export type UserAvgAggregateOutputType = {
  id: number
}

export type UserSumAggregateOutputType = {
  id: number
}

export type UserMinAggregateOutputType = {
  id: number
}

export type UserMaxAggregateOutputType = {
  id: number
}


export type UserAvgAggregateInputType = {
  id?: true
}

export type UserSumAggregateInputType = {
  id?: true
}

export type UserMinAggregateInputType = {
  id?: true
}

export type UserMaxAggregateInputType = {
  id?: true
}

export type AggregateUserArgs = {
  where?: UserWhereInput
  orderBy?: XOR<Enumerable<UserOrderByInput>, UserOrderByInput>
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
  count?: true
  avg?: UserAvgAggregateInputType
  sum?: UserSumAggregateInputType
  min?: UserMinAggregateInputType
  max?: UserMaxAggregateInputType
}

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>
}

export type GetUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserAvgAggregateOutputType ? UserAvgAggregateOutputType[P] : never
}
    
    

export type UserSelect = {
  id?: boolean
  name?: boolean
  email?: boolean
  isAdmin?: boolean
  password?: boolean
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
 never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User that matches the filter.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find the first User that matches the filter.
   * @param {FindFirstUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstUserArgs>(
    args?: Subset<T, FindFirstUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users that matches the filter.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findFirst
 */
export type FindFirstUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Filter, which User to fetch.
  **/
  where?: UserWhereInput
  orderBy?: XOR<Enumerable<UserOrderByInput>, UserOrderByInput>
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: XOR<Enumerable<UserOrderByInput>, UserOrderByInput>
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
}



/**
 * Model Restaurant
 */

export type Restaurant = {
  id: number
  name: string | null
  description: string | null
  isActive: boolean | null
}


export type AggregateRestaurant = {
  count: number
  avg: RestaurantAvgAggregateOutputType | null
  sum: RestaurantSumAggregateOutputType | null
  min: RestaurantMinAggregateOutputType | null
  max: RestaurantMaxAggregateOutputType | null
}

export type RestaurantAvgAggregateOutputType = {
  id: number
}

export type RestaurantSumAggregateOutputType = {
  id: number
}

export type RestaurantMinAggregateOutputType = {
  id: number
}

export type RestaurantMaxAggregateOutputType = {
  id: number
}


export type RestaurantAvgAggregateInputType = {
  id?: true
}

export type RestaurantSumAggregateInputType = {
  id?: true
}

export type RestaurantMinAggregateInputType = {
  id?: true
}

export type RestaurantMaxAggregateInputType = {
  id?: true
}

export type AggregateRestaurantArgs = {
  where?: RestaurantWhereInput
  orderBy?: XOR<Enumerable<RestaurantOrderByInput>, RestaurantOrderByInput>
  cursor?: RestaurantWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<RestaurantDistinctFieldEnum>
  count?: true
  avg?: RestaurantAvgAggregateInputType
  sum?: RestaurantSumAggregateInputType
  min?: RestaurantMinAggregateInputType
  max?: RestaurantMaxAggregateInputType
}

export type GetRestaurantAggregateType<T extends AggregateRestaurantArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetRestaurantAggregateScalarType<T[P]>
}

export type GetRestaurantAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof RestaurantAvgAggregateOutputType ? RestaurantAvgAggregateOutputType[P] : never
}
    
    

export type RestaurantSelect = {
  id?: boolean
  name?: boolean
  description?: boolean
  isActive?: boolean
}

export type RestaurantGetPayload<
  S extends boolean | null | undefined | RestaurantArgs,
  U = keyof S
> = S extends true
  ? Restaurant
  : S extends undefined
  ? never
  : S extends RestaurantArgs | FindManyRestaurantArgs
  ? 'include' extends U
    ? Restaurant 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Restaurant ? Restaurant[P]
: 
 never
    }
  : Restaurant
: Restaurant


export interface RestaurantDelegate {
  /**
   * Find zero or one Restaurant that matches the filter.
   * @param {FindOneRestaurantArgs} args - Arguments to find a Restaurant
   * @example
   * // Get one Restaurant
   * const restaurant = await prisma.restaurant.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneRestaurantArgs>(
    args: Subset<T, FindOneRestaurantArgs>
  ): CheckSelect<T, Prisma__RestaurantClient<Restaurant | null>, Prisma__RestaurantClient<RestaurantGetPayload<T> | null>>
  /**
   * Find the first Restaurant that matches the filter.
   * @param {FindFirstRestaurantArgs} args - Arguments to find a Restaurant
   * @example
   * // Get one Restaurant
   * const restaurant = await prisma.restaurant.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstRestaurantArgs>(
    args?: Subset<T, FindFirstRestaurantArgs>
  ): CheckSelect<T, Prisma__RestaurantClient<Restaurant | null>, Prisma__RestaurantClient<RestaurantGetPayload<T> | null>>
  /**
   * Find zero or more Restaurants that matches the filter.
   * @param {FindManyRestaurantArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Restaurants
   * const restaurants = await prisma.restaurant.findMany()
   * 
   * // Get first 10 Restaurants
   * const restaurants = await prisma.restaurant.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const restaurantWithIdOnly = await prisma.restaurant.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyRestaurantArgs>(
    args?: Subset<T, FindManyRestaurantArgs>
  ): CheckSelect<T, Promise<Array<Restaurant>>, Promise<Array<RestaurantGetPayload<T>>>>
  /**
   * Create a Restaurant.
   * @param {RestaurantCreateArgs} args - Arguments to create a Restaurant.
   * @example
   * // Create one Restaurant
   * const Restaurant = await prisma.restaurant.create({
   *   data: {
   *     // ... data to create a Restaurant
   *   }
   * })
   * 
  **/
  create<T extends RestaurantCreateArgs>(
    args: Subset<T, RestaurantCreateArgs>
  ): CheckSelect<T, Prisma__RestaurantClient<Restaurant>, Prisma__RestaurantClient<RestaurantGetPayload<T>>>
  /**
   * Delete a Restaurant.
   * @param {RestaurantDeleteArgs} args - Arguments to delete one Restaurant.
   * @example
   * // Delete one Restaurant
   * const Restaurant = await prisma.restaurant.delete({
   *   where: {
   *     // ... filter to delete one Restaurant
   *   }
   * })
   * 
  **/
  delete<T extends RestaurantDeleteArgs>(
    args: Subset<T, RestaurantDeleteArgs>
  ): CheckSelect<T, Prisma__RestaurantClient<Restaurant>, Prisma__RestaurantClient<RestaurantGetPayload<T>>>
  /**
   * Update one Restaurant.
   * @param {RestaurantUpdateArgs} args - Arguments to update one Restaurant.
   * @example
   * // Update one Restaurant
   * const restaurant = await prisma.restaurant.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends RestaurantUpdateArgs>(
    args: Subset<T, RestaurantUpdateArgs>
  ): CheckSelect<T, Prisma__RestaurantClient<Restaurant>, Prisma__RestaurantClient<RestaurantGetPayload<T>>>
  /**
   * Delete zero or more Restaurants.
   * @param {RestaurantDeleteManyArgs} args - Arguments to filter Restaurants to delete.
   * @example
   * // Delete a few Restaurants
   * const { count } = await prisma.restaurant.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends RestaurantDeleteManyArgs>(
    args: Subset<T, RestaurantDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Restaurants.
   * @param {RestaurantUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Restaurants
   * const restaurant = await prisma.restaurant.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends RestaurantUpdateManyArgs>(
    args: Subset<T, RestaurantUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Restaurant.
   * @param {RestaurantUpsertArgs} args - Arguments to update or create a Restaurant.
   * @example
   * // Update or create a Restaurant
   * const restaurant = await prisma.restaurant.upsert({
   *   create: {
   *     // ... data to create a Restaurant
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Restaurant we want to update
   *   }
   * })
  **/
  upsert<T extends RestaurantUpsertArgs>(
    args: Subset<T, RestaurantUpsertArgs>
  ): CheckSelect<T, Prisma__RestaurantClient<Restaurant>, Prisma__RestaurantClient<RestaurantGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyRestaurantArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateRestaurantArgs>(args: Subset<T, AggregateRestaurantArgs>): Promise<GetRestaurantAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Restaurant.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__RestaurantClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Restaurant findOne
 */
export type FindOneRestaurantArgs = {
  /**
   * Select specific fields to fetch from the Restaurant
  **/
  select?: XOR<RestaurantSelect, null>
  /**
   * Filter, which Restaurant to fetch.
  **/
  where: RestaurantWhereUniqueInput
}


/**
 * Restaurant findFirst
 */
export type FindFirstRestaurantArgs = {
  /**
   * Select specific fields to fetch from the Restaurant
  **/
  select?: XOR<RestaurantSelect, null>
  /**
   * Filter, which Restaurant to fetch.
  **/
  where?: RestaurantWhereInput
  orderBy?: XOR<Enumerable<RestaurantOrderByInput>, RestaurantOrderByInput>
  cursor?: RestaurantWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<RestaurantDistinctFieldEnum>
}


/**
 * Restaurant findMany
 */
export type FindManyRestaurantArgs = {
  /**
   * Select specific fields to fetch from the Restaurant
  **/
  select?: XOR<RestaurantSelect, null>
  /**
   * Filter, which Restaurants to fetch.
  **/
  where?: RestaurantWhereInput
  /**
   * Determine the order of the Restaurants to fetch.
  **/
  orderBy?: XOR<Enumerable<RestaurantOrderByInput>, RestaurantOrderByInput>
  /**
   * Sets the position for listing Restaurants.
  **/
  cursor?: RestaurantWhereUniqueInput
  /**
   * The number of Restaurants to fetch. If negative number, it will take Restaurants before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Restaurants.
  **/
  skip?: number
  distinct?: Enumerable<RestaurantDistinctFieldEnum>
}


/**
 * Restaurant create
 */
export type RestaurantCreateArgs = {
  /**
   * Select specific fields to fetch from the Restaurant
  **/
  select?: XOR<RestaurantSelect, null>
  /**
   * The data needed to create a Restaurant.
  **/
  data: RestaurantCreateInput
}


/**
 * Restaurant update
 */
export type RestaurantUpdateArgs = {
  /**
   * Select specific fields to fetch from the Restaurant
  **/
  select?: XOR<RestaurantSelect, null>
  /**
   * The data needed to update a Restaurant.
  **/
  data: RestaurantUpdateInput
  /**
   * Choose, which Restaurant to update.
  **/
  where: RestaurantWhereUniqueInput
}


/**
 * Restaurant updateMany
 */
export type RestaurantUpdateManyArgs = {
  data: RestaurantUpdateManyMutationInput
  where?: RestaurantWhereInput
}


/**
 * Restaurant upsert
 */
export type RestaurantUpsertArgs = {
  /**
   * Select specific fields to fetch from the Restaurant
  **/
  select?: XOR<RestaurantSelect, null>
  /**
   * The filter to search for the Restaurant to update in case it exists.
  **/
  where: RestaurantWhereUniqueInput
  /**
   * In case the Restaurant found by the `where` argument doesn't exist, create a new Restaurant with this data.
  **/
  create: RestaurantCreateInput
  /**
   * In case the Restaurant was found with the provided `where` argument, update it with this data.
  **/
  update: RestaurantUpdateInput
}


/**
 * Restaurant delete
 */
export type RestaurantDeleteArgs = {
  /**
   * Select specific fields to fetch from the Restaurant
  **/
  select?: XOR<RestaurantSelect, null>
  /**
   * Filter which Restaurant to delete.
  **/
  where: RestaurantWhereUniqueInput
}


/**
 * Restaurant deleteMany
 */
export type RestaurantDeleteManyArgs = {
  where?: RestaurantWhereInput
}


/**
 * Restaurant without action
 */
export type RestaurantArgs = {
  /**
   * Select specific fields to fetch from the Restaurant
  **/
  select?: XOR<RestaurantSelect, null>
}



/**
 * Deep Input Types
 */


export type UserWhereInput = {
  AND?: XOR<UserWhereInput, Enumerable<UserWhereInput>>
  OR?: XOR<UserWhereInput, Enumerable<UserWhereInput>>
  NOT?: XOR<UserWhereInput, Enumerable<UserWhereInput>>
  id?: XOR<IntFilter, number>
  name?: StringNullableFilter | string | null
  email?: StringNullableFilter | string | null
  isAdmin?: BoolNullableFilter | boolean | null
  password?: StringNullableFilter | string | null
}

export type UserOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  email?: SortOrder
  isAdmin?: SortOrder
  password?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
  email?: string
}

export type RestaurantWhereInput = {
  AND?: XOR<RestaurantWhereInput, Enumerable<RestaurantWhereInput>>
  OR?: XOR<RestaurantWhereInput, Enumerable<RestaurantWhereInput>>
  NOT?: XOR<RestaurantWhereInput, Enumerable<RestaurantWhereInput>>
  id?: XOR<IntFilter, number>
  name?: StringNullableFilter | string | null
  description?: StringNullableFilter | string | null
  isActive?: BoolNullableFilter | boolean | null
}

export type RestaurantOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  description?: SortOrder
  isActive?: SortOrder
}

export type RestaurantWhereUniqueInput = {
  id?: number
}

export type UserCreateInput = {
  name?: XOR<string, null>
  email?: XOR<string, null>
  isAdmin?: XOR<boolean, null>
  password?: XOR<string, null>
}

export type UserUpdateInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | NullableStringFieldUpdateOperationsInput | null
  isAdmin?: boolean | NullableBoolFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
}

export type UserUpdateManyMutationInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | NullableStringFieldUpdateOperationsInput | null
  isAdmin?: boolean | NullableBoolFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
}

export type RestaurantCreateInput = {
  name?: XOR<string, null>
  description?: XOR<string, null>
  isActive?: XOR<boolean, null>
}

export type RestaurantUpdateInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  description?: string | NullableStringFieldUpdateOperationsInput | null
  isActive?: boolean | NullableBoolFieldUpdateOperationsInput | null
}

export type RestaurantUpdateManyMutationInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  description?: string | NullableStringFieldUpdateOperationsInput | null
  isActive?: boolean | NullableBoolFieldUpdateOperationsInput | null
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: XOR<number, NestedIntFilter>
}

export type StringNullableFilter = {
  equals?: XOR<string, null>
  in?: XOR<Enumerable<string>, null>
  notIn?: XOR<Enumerable<string>, null>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringNullableFilter | null
}

export type BoolNullableFilter = {
  equals?: XOR<boolean, null>
  not?: boolean | NestedBoolNullableFilter | null
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: XOR<string, null>
}

export type NullableBoolFieldUpdateOperationsInput = {
  set?: XOR<boolean, null>
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: XOR<number, NestedIntFilter>
}

export type NestedStringNullableFilter = {
  equals?: XOR<string, null>
  in?: XOR<Enumerable<string>, null>
  notIn?: XOR<Enumerable<string>, null>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringNullableFilter | null
}

export type NestedBoolNullableFilter = {
  equals?: XOR<boolean, null>
  not?: boolean | NestedBoolNullableFilter | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
